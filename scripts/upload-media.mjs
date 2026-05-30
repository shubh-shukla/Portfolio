#!/usr/bin/env node
/**
 * Upload everything under public/media/ to a Supabase Storage bucket,
 * preserving directory structure. Idempotent: existing objects are upserted.
 *
 * Required env (in .env.local):
 *   SUPABASE_URL=https://xxxx.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY=<service role key, server-only>
 *   SUPABASE_BUCKET=portfolio-media           # bucket must be public
 *
 * Usage:
 *   npm run media:upload                      # upload all
 *   npm run media:upload -- --dry             # list only
 *   npm run media:upload -- --prefix=Xtratune # only paths containing this
 */
import { createClient } from '@supabase/supabase-js';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import mime from 'mime-types';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = process.env.SUPABASE_BUCKET || 'portfolio-media';

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error(
    'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Add them to .env.local.'
  );
  process.exit(1);
}

const args = process.argv.slice(2);
const DRY = args.includes('--dry');
const prefixArg = args.find((a) => a.startsWith('--prefix='));
const prefix = prefixArg ? prefixArg.split('=')[1] : '';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..', 'public', 'media');

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const walk = (dir) => {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
};

const files = walk(ROOT)
  .filter((f) => !f.endsWith('.DS_Store'))
  .filter((f) => (prefix ? f.includes(prefix) : true));

console.log(
  `Found ${files.length} file(s) under public/media${
    prefix ? ` (filter: ${prefix})` : ''
  }${DRY ? ' [dry-run]' : ''}`
);

let ok = 0;
let fail = 0;

for (const file of files) {
  // Object key under bucket: media/<original/relative/path>
  const rel = relative(join(__dirname, '..', 'public'), file).split(sep).join('/');
  // Sanitize illegal chars (e.g. `|`) so the key is acceptable to Supabase.
  // Must match `sanitizeMediaKey` in src/lib/utils.ts so URLs line up.
  const key = rel.replace(/[^A-Za-z0-9._\-/ ]/g, '_');
  const contentType = mime.lookup(file) || 'application/octet-stream';

  if (DRY) {
    console.log(`  ${key}  (${contentType})${key !== rel ? `  [renamed from ${rel}]` : ''}`);
    continue;
  }

  const buf = readFileSync(file);
  const { error } = await supabase.storage.from(BUCKET).upload(key, buf, {
    contentType,
    upsert: true,
    cacheControl: '31536000',
  });

  if (error) {
    fail++;
    console.error(`  FAIL ${key}  ->  ${error.message}`);
  } else {
    ok++;
    process.stdout.write(`.`);
  }
}

if (!DRY) {
  console.log(`\nDone. ${ok} uploaded, ${fail} failed.`);
  const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl('');
  const base = (pub?.publicUrl || '').replace(/\/$/, '');
  console.log(
    `\nPublic base URL:\n  ${base}\n\nSet this in .env.local:\n  NEXT_PUBLIC_MEDIA_BASE_URL=${base}\n`
  );
}
