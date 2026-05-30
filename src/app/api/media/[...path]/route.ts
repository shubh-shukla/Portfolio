import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = process.env.SUPABASE_BUCKET || 'portfolio-media';
const SIGN_TTL_SECONDS = 60 * 60; // 1 hour

// Hosts (comma-separated) that may load media. Anything not on this list — even
// other Vercel preview URLs of a fork — gets 403. Example value:
//   localhost:3000,shubhamshukla.dev,www.shubhamshukla.dev
const allowedHosts = new Set<string>(
  (process.env.MEDIA_ALLOWED_HOSTS || '')
    .split(',')
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean)
);

// Convenience: also allow the canonical site URL if provided.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
if (SITE_URL) {
  try {
    allowedHosts.add(new URL(SITE_URL).host.toLowerCase());
  } catch {
    // ignore bad URL
  }
}

const supabase =
  SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false },
      })
    : null;

const isAllowedOrigin = (req: NextRequest) => {
  if (allowedHosts.size === 0) return false;

  const host = (req.headers.get('host') || '').toLowerCase();
  if (allowedHosts.has(host)) return true;

  const origin = req.headers.get('origin');
  const referer = req.headers.get('referer');

  for (const candidate of [origin, referer]) {
    if (!candidate) continue;
    try {
      const u = new URL(candidate);
      if (allowedHosts.has(u.host.toLowerCase())) return true;
    } catch {
      // ignore
    }
  }

  // No origin/referer at all (direct address-bar hit, image-optimizer in some
  // setups, etc). Allow only if the host header is on the allowlist.
  if (!origin && !referer) return allowedHosts.has(host);

  return false;
};

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  if (!supabase) {
    return new NextResponse('Media storage not configured', { status: 500 });
  }

  if (!isAllowedOrigin(req)) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  const objectPath = (params.path || []).map(decodeURIComponent).join('/');
  if (!objectPath) {
    return new NextResponse('Not found', { status: 404 });
  }

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(objectPath, SIGN_TTL_SECONDS);

  if (error || !data?.signedUrl) {
    return new NextResponse('Not found', { status: 404 });
  }

  return NextResponse.redirect(data.signedUrl, {
    status: 307,
    headers: {
      // Browser/CDN caches the redirect well within the signed-URL lifetime.
      'Cache-Control': 'private, max-age=3300, stale-while-revalidate=600',
    },
  });
}
