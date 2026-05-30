#!/usr/bin/env node
/**
 * Aggressive video optimization for Supabase-hosted project media.
 *
 *   - Re-encode mp4 → 540p, H.264 CRF 23, preset slow, no audio
 *     (videos render in a phone-shaped frame ~280px wide; 540p source is
 *     2x oversampled for retina, visually identical on screen)
 *   - Generate <name>.poster.webp (frame 1, lossy q85) so the browser shows
 *     something instantly without fetching the mp4
 *
 * Originals are backed up under tmp/originals-v2/.
 *
 * Usage:
 *   node scripts/optimize-videos.mjs            # apply
 *   node scripts/optimize-videos.mjs -- --dry   # preview only
 */
import { createClient } from '@supabase/supabase-js';
import { execFileSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = process.env.SUPABASE_BUCKET || 'portfolio-media';

const args = process.argv.slice(2);
const DRY = args.includes('--dry');

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');
const TMP = join(ROOT, 'tmp', 'optimize-v2');
const BACKUP = join(ROOT, 'tmp', 'originals-v2');
mkdirSync(TMP, { recursive: true });
mkdirSync(BACKUP, { recursive: true });

const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const fmt = (n) => `${(n / 1024).toFixed(0)} KB`;
const pct = (a, b) => `${(((a - b) / a) * 100).toFixed(0)}%`;

async function listAll(prefix = '') {
  const out = [];
  const { data, error } = await sb.storage
    .from(BUCKET)
    .list(prefix, { limit: 1000 });
  if (error) throw error;
  for (const e of data) {
    const path = prefix ? `${prefix}/${e.name}` : e.name;
    if (e.id == null) out.push(...(await listAll(path)));
    else out.push({ path, size: e.metadata?.size ?? 0 });
  }
  return out;
}

async function download(key) {
  const { data, error } = await sb.storage.from(BUCKET).download(key);
  if (error) throw error;
  const buf = Buffer.from(await data.arrayBuffer());
  const local = join(TMP, key);
  mkdirSync(dirname(local), { recursive: true });
  writeFileSync(local, buf);
  const back = join(BACKUP, key);
  if (!existsSync(back)) {
    mkdirSync(dirname(back), { recursive: true });
    writeFileSync(back, buf);
  }
  return local;
}

async function upload(key, localPath, contentType) {
  const buf = readFileSync(localPath);
  const { error } = await sb.storage.from(BUCKET).upload(key, buf, {
    contentType,
    upsert: true,
    cacheControl: '31536000',
  });
  if (error) throw error;
}

const reencodeVideo = (input, output) => {
  execFileSync(
    'ffmpeg',
    [
      '-y',
      '-i',
      input,
      '-vf',
      "scale='min(540,iw)':-2",
      '-c:v',
      'libx264',
      '-crf',
      '23',
      '-preset',
      'slow',
      '-pix_fmt',
      'yuv420p',
      '-movflags',
      '+faststart',
      '-an',
      output,
    ],
    { stdio: ['ignore', 'ignore', 'pipe'] }
  );
};

const makePoster = (input, output) => {
  // Capture frame at 0.5s, scale, write PNG via stdout, encode WebP with cwebp.
  // (this ffmpeg build lacks libwebp; pipe through cwebp instead.)
  const png = execFileSync(
    'ffmpeg',
    [
      '-y',
      '-ss',
      '0.5',
      '-i',
      input,
      '-vframes',
      '1',
      '-vf',
      "scale='min(540,iw)':-2",
      '-f',
      'image2pipe',
      '-vcodec',
      'png',
      '-',
    ],
    { stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 50 * 1024 * 1024 }
  );
  execFileSync('cwebp', ['-q', '85', '-m', '6', '-mt', '-o', output, '--', '-'], {
    input: png,
    stdio: ['pipe', 'ignore', 'pipe'],
  });
};

const main = async () => {
  console.log(`Mode: ${DRY ? 'DRY' : 'APPLY'}\n`);

  const all = await listAll();
  const videos = all.filter(
    (f) => f.path.startsWith('media/projects/') && f.path.endsWith('.mp4')
  );

  let totalBefore = 0;
  let totalAfter = 0;
  let totalPosters = 0;

  for (const v of videos) {
    process.stdout.write(`🎬 ${v.path}  (${fmt(v.size)}) ... `);
    totalBefore += v.size;
    if (DRY) {
      console.log('(would re-encode + poster)');
      continue;
    }

    try {
      const local = await download(v.path);
      const optMp4 = local.replace(/\.mp4$/i, '.opt.mp4');
      const posterLocal = local.replace(/\.mp4$/i, '.poster.webp');
      const posterKey = v.path.replace(/\.mp4$/i, '.poster.webp');

      reencodeVideo(local, optMp4);
      makePoster(local, posterLocal);

      const newSize = statSync(optMp4).size;
      const posterSize = statSync(posterLocal).size;

      // Always re-upload (we want poster + smaller mp4 even if savings < threshold)
      await upload(v.path, optMp4, 'video/mp4');
      await upload(posterKey, posterLocal, 'image/webp');

      totalAfter += newSize;
      totalPosters += posterSize;
      console.log(
        `${fmt(v.size)} → ${fmt(newSize)} mp4 + ${fmt(posterSize)} poster (-${pct(v.size, newSize + posterSize)})`
      );

      rmSync(optMp4, { force: true });
      rmSync(posterLocal, { force: true });
    } catch (err) {
      console.log(`ERROR: ${err.message || err}`);
      totalAfter += v.size;
    }
  }

  console.log(
    `\nVideos: ${fmt(totalBefore)} → ${fmt(totalAfter)}  (-${pct(totalBefore, totalAfter)})`
  );
  console.log(`Posters added: ${fmt(totalPosters)}`);
  console.log(
    `Net: ${fmt(totalBefore)} → ${fmt(totalAfter + totalPosters)}  (-${pct(totalBefore, totalAfter + totalPosters)})`
  );
  if (!DRY) console.log(`\nBackups: ${BACKUP}`);
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
