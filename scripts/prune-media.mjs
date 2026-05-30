#!/usr/bin/env node
/**
 * Delete every object in the bucket whose key does NOT exist on disk under
 * public/. Run this after renaming/removing local files to keep Supabase
 * storage in sync.
 *
 *   npm run media:prune -- --dry      # show what would be deleted
 *   npm run media:prune               # actually delete
 */
import { createClient } from '@supabase/supabase-js';
import { readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = process.env.SUPABASE_BUCKET || 'portfolio-media';

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const DRY = process.argv.includes('--dry');

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PUBLIC_DIR = join(__dirname, '..', 'public');

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

// Walk every object in the bucket (recursive list).
const listAll = async (prefix = '') => {
  const out = [];
  let offset = 0;
  const limit = 1000;
  while (true) {
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .list(prefix, { limit, offset, sortBy: { column: 'name', order: 'asc' } });
    if (error) throw error;
    if (!data || data.length === 0) break;
    for (const item of data) {
      // Folders have id === null and metadata === null
      if (item.id === null && item.metadata === null) {
        out.push(...(await listAll(prefix ? `${prefix}/${item.name}` : item.name)));
      } else {
        out.push(prefix ? `${prefix}/${item.name}` : item.name);
      }
    }
    if (data.length < limit) break;
    offset += limit;
  }
  return out;
};

// Build the set of expected keys from the local public/ tree, applying the
// same sanitization the upload script uses.
const sanitize = (s) => s.replace(/[^A-Za-z0-9._\-/ ]/g, '_');
const walk = (dir) => {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    if (entry === '.DS_Store') continue;
    const full = join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
};

const expected = new Set(
  walk(join(PUBLIC_DIR, 'media')).map((f) =>
    sanitize(relative(PUBLIC_DIR, f).split(sep).join('/'))
  )
);

console.log(`Local expected keys: ${expected.size}`);

// Subtrees under `media/` that are owned by Supabase only — i.e. not kept
// in the repo. Remote keys under these prefixes are NEVER pruned, so
// running media:prune locally won't wipe cloud-only assets.
const CLOUD_ONLY_PREFIXES = ['media/projects/'];
const isCloudOnly = (key) =>
  CLOUD_ONLY_PREFIXES.some((p) => key.startsWith(p));

// List both legacy `images/projects` and the entire `media/` tree so old
// keys from a prior layout are cleaned up too.
const [legacy, current] = await Promise.all([
  listAll('images/projects').catch(() => []),
  listAll('media'),
]);
const remote = [...legacy, ...current];
console.log(
  `Remote keys: ${remote.length} (legacy images/projects: ${legacy.length}, media: ${current.length})`
);

const stale = remote.filter((k) => !expected.has(k) && !isCloudOnly(k));
console.log(`Stale (will ${DRY ? 'be listed' : 'delete'}): ${stale.length}`);

if (stale.length === 0) process.exit(0);

if (DRY) {
  for (const k of stale) console.log(`  - ${k}`);
  process.exit(0);
}

// Supabase remove() takes max ~1000 keys per call.
const chunks = [];
for (let i = 0; i < stale.length; i += 500) chunks.push(stale.slice(i, i + 500));

let deleted = 0;
for (const chunk of chunks) {
  const { data, error } = await supabase.storage.from(BUCKET).remove(chunk);
  if (error) {
    console.error(`Chunk failed: ${error.message}`);
  } else {
    deleted += data?.length || 0;
  }
}
console.log(`Deleted ${deleted} stale object(s).`);
