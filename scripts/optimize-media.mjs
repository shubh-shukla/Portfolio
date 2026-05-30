#!/usr/bin/env node
/**
 * Optimize project media in Supabase Storage in-place.
 *   - mp4 → H.264 CRF 18 preset slow, audio stripped (visually lossless)
 *   - png → lossless WebP method 6, exact mode (pixel-identical, smaller)
 *
 * Originals are kept under tmp/originals/ for safety. Run with --dry to preview.
 *
 * Usage:
 *   npm run media:optimize          # apply
 *   npm run media:optimize -- --dry # preview only
 *   npm run media:optimize -- --prefix=media/projects/xtratune-mobile
 */
import { createClient } from '@supabase/supabase-js';
import { execFileSync } from 'node:child_process';
import {
  mkdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
  existsSync,
} from 'node:fs';
import { dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = process.env.SUPABASE_BUCKET || 'portfolio-media';

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const args = process.argv.slice(2);
const DRY = args.includes('--dry');
const prefixArg = args.find((a) => a.startsWith('--prefix='));
const onlyPrefix = prefixArg ? prefixArg.split('=')[1] : 'media/projects/';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');
const TMP = join(ROOT, 'tmp', 'optimize');
const BACKUP = join(ROOT, 'tmp', 'originals');
const RENAMES = join(ROOT, 'tmp', 'renames.json');

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
  // Backup original
  const back = join(BACKUP, key);
  if (!existsSync(back)) {
    mkdirSync(dirname(back), { recursive: true });
    writeFileSync(back, buf);
  }
  return local;
}

async function uploadFile(key, localPath, contentType) {
  const buf = readFileSync(localPath);
  const { error } = await sb.storage.from(BUCKET).upload(key, buf, {
    contentType,
    upsert: true,
    cacheControl: '3600',
  });
  if (error) throw error;
}

async function removeKey(key) {
  const { error } = await sb.storage.from(BUCKET).remove([key]);
  if (error) throw error;
}

const optimizeMp4 = (input, output) => {
  execFileSync(
    'ffmpeg',
    [
      '-y',
      '-i',
      input,
      '-c:v',
      'libx264',
      '-crf',
      '18',
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

const optimizePng = (input, output) => {
  // Lossless WebP — pixel-identical to source PNG, but typically 30-60% smaller.
  execFileSync(
    'cwebp',
    ['-lossless', '-z', '9', '-m', '6', '-mt', '-exact', input, '-o', output],
    { stdio: ['ignore', 'ignore', 'pipe'] }
  );
};

const main = async () => {
  console.log(`Bucket: ${BUCKET}`);
  console.log(`Prefix: ${onlyPrefix}`);
  console.log(`Mode:   ${DRY ? 'DRY RUN' : 'APPLY'}\n`);

  const all = (await listAll()).filter((f) => f.path.startsWith(onlyPrefix));
  const targets = all.filter((f) => /\.(mp4|png)$/i.test(f.path));

  let totalBefore = 0;
  let totalAfter = 0;
  let savedFiles = 0;
  const renames = {}; // oldKey -> newKey

  for (const f of targets) {
    const ext = extname(f.path).toLowerCase();
    const isVideo = ext === '.mp4';
    const newKey = isVideo ? f.path : f.path.replace(/\.png$/i, '.webp');
    const tag = isVideo ? '🎬' : '🖼 ';

    process.stdout.write(`${tag} ${f.path}  (${fmt(f.size)}) ... `);
    totalBefore += f.size;

    if (DRY) {
      console.log('(would optimize)');
      continue;
    }

    try {
      const localIn = await download(f.path);
      const localOut = isVideo
        ? localIn.replace(/\.mp4$/i, '.opt.mp4')
        : localIn.replace(/\.png$/i, '.webp');

      if (isVideo) optimizeMp4(localIn, localOut);
      else optimizePng(localIn, localOut);

      const newSize = statSync(localOut).size;

      if (newSize >= f.size * 0.95) {
        // < 5% savings — keep original
        console.log(`skip (only ${pct(f.size, newSize)} smaller)`);
        totalAfter += f.size;
        rmSync(localOut, { force: true });
        continue;
      }

      const contentType = isVideo ? 'video/mp4' : 'image/webp';
      await uploadFile(newKey, localOut, contentType);
      if (newKey !== f.path) {
        await removeKey(f.path);
        renames[f.path] = newKey;
      }
      console.log(`${fmt(f.size)} → ${fmt(newSize)}  (-${pct(f.size, newSize)})`);
      totalAfter += newSize;
      savedFiles++;
    } catch (err) {
      console.log(`ERROR: ${err.message || err}`);
      totalAfter += f.size;
    }
  }

  if (!DRY && Object.keys(renames).length) {
    writeFileSync(RENAMES, JSON.stringify(renames, null, 2));
    console.log(`\nWrote rename map → ${RENAMES}`);
  }

  console.log(`\nFiles optimized: ${savedFiles}/${targets.length}`);
  console.log(
    `Total: ${fmt(totalBefore)} → ${fmt(totalAfter)}  (saved ${fmt(totalBefore - totalAfter)}, ${pct(totalBefore, totalAfter)})`
  );
  if (!DRY) {
    console.log(`\nOriginals backed up at: ${BACKUP}`);
    console.log('Delete that folder once you have verified visuals.');
  }
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
