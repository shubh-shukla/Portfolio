import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REST_TOKEN;

const CV_CLICK_EVENTS_KEY = 'cv_click_events';
const CV_CLICK_EVENTS_KEEP_DAYS = 60; // keep enough for at least last-month history

async function upstashMultiExec(commands: any[][]) {
  if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) return null;

  const res = await fetch(`${UPSTASH_REDIS_REST_URL}/multi-exec`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commands),
  });

  if (!res.ok) return null;
  return res.json();
}

export async function POST(req: Request) {
  const bodyText = await req.text().catch(() => '');
  const params = new URLSearchParams(bodyText);
  const browser = (params.get('browser') ?? 'Other').toString();
  const browserSafe =
    browser.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 20) || 'Other';

  const nowMs = Date.now();
  console.log(`CV_CLICK browser=${browserSafe}`);

  const rand = Math.random().toString(36).slice(2, 9);
  const member = `${nowMs}|${browserSafe}|${rand}`;
  const minKeepMs =
    nowMs - CV_CLICK_EVENTS_KEEP_DAYS * 24 * 60 * 60 * 1000;

  await upstashMultiExec([
    ['ZADD', CV_CLICK_EVENTS_KEY, nowMs, member],
    // Remove anything older than our retention window.
    ['ZREMRANGEBYSCORE', CV_CLICK_EVENTS_KEY, 0, minKeepMs],
  ]);

  return NextResponse.json({ ok: true }, { status: 200 });
}

