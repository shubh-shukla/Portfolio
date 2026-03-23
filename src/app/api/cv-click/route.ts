import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export const runtime = 'nodejs';

const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const CV_CLICK_EVENTS_KEY = 'cv_click_events';
const CV_CLICK_EVENTS_KEEP_DAYS = 60; // keep enough for at least last-month history

async function upstashMultiExec(commands: any[][]) {
  if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
    console.error('CV_CLICK upstash env vars missing');
    return null;
  }

  // Upstash REST API expects all arguments as strings.
  const stringified = commands.map((cmd) => cmd.map(String));

  const res = await fetch(`${UPSTASH_REDIS_REST_URL}/multi-exec`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(stringified),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    console.error(`CV_CLICK upstash error ${res.status}: ${text}`);
    return null;
  }
  return res.json();
}

function sanitize(val: string | null, maxLen = 30): string {
  return (val ?? '').replace(/[^a-zA-Z0-9_.\-\/ ]/g, '').slice(0, maxLen) || '';
}

export async function POST(req: Request) {
  const bodyText = await req.text().catch(() => '');
  const params = new URLSearchParams(bodyText);

  const nowMs = Date.now();
  const nowISO = new Date(nowMs).toISOString();

  // Client-sent fields
  const browser = sanitize(params.get('browser'), 20) || 'Other';
  const os = sanitize(params.get('os'), 20) || 'Other';
  const language = sanitize(params.get('language'), 10);
  const referrer = (params.get('referrer') ?? '').slice(0, 200);
  const screenRes = sanitize(params.get('screen'), 15);
  const timezone = sanitize(params.get('timezone'), 40);
  const mobile = params.get('mobile') === 'true';

  // Server-side fields from Vercel / request headers
  const hdrs = await headers();
  const ip = hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() || '';
  const country = hdrs.get('x-vercel-ip-country') || '';
  const city = hdrs.get('x-vercel-ip-city') || '';
  const region = hdrs.get('x-vercel-ip-country-region') || '';

  console.log(`CV_CLICK browser=${browser} os=${os} country=${country}`);

  const rand = Math.random().toString(36).slice(2, 9);

  const event = JSON.stringify({
    id: `${nowMs}-${rand}`,
    timestamp: nowISO,
    browser,
    os,
    mobile,
    language,
    referrer,
    screen: screenRes,
    timezone,
    ip,
    country,
    region,
    city: decodeURIComponent(city),
  });

  const minKeepMs =
    nowMs - CV_CLICK_EVENTS_KEEP_DAYS * 24 * 60 * 60 * 1000;

  await upstashMultiExec([
    ['ZADD', CV_CLICK_EVENTS_KEY, nowMs, event],
    ['ZREMRANGEBYSCORE', CV_CLICK_EVENTS_KEY, 0, minKeepMs],
  ]);

  return NextResponse.json({ ok: true }, { status: 200 });
}

