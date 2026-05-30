import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const BUCKET = process.env.SUPABASE_BUCKET || 'portfolio-media';

async function walk(prefix='') {
  const out = [];
  const { data, error } = await sb.storage.from(BUCKET).list(prefix, { limit: 1000 });
  if (error) throw error;
  for (const e of data) {
    const path = prefix ? `${prefix}/${e.name}` : e.name;
    if (e.id == null) out.push(...await walk(path));
    else out.push({ path, size: e.metadata?.size ?? 0, type: e.metadata?.mimetype });
  }
  return out;
}
const all = await walk();
all.sort((a,b)=>b.size-a.size);
let total=0;
for (const f of all) { total+=f.size; }
console.log(`TOTAL: ${(total/1024/1024).toFixed(1)} MB across ${all.length} files\n`);
console.log('Top 30 largest:');
for (const f of all.slice(0,30)) {
  console.log(`${(f.size/1024).toFixed(0).padStart(7)} KB  ${f.type||''}  ${f.path}`);
}
console.log('\nALL paths:');
for (const f of all) console.log(`PATH: ${f.path}`);
