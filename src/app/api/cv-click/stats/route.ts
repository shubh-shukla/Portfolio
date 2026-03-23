import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const CV_CLICK_EVENTS_KEY = 'cv_click_events';
const HISTORY_DAYS = 30;

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
  return (await res.json()) as unknown;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const limitParam = url.searchParams.get('limit');
  const limit =
    limitParam == null ? 200 : Math.min(Math.max(Number(limitParam), 1), 1000);

  const nowMs = Date.now();
  const minMs = nowMs - HISTORY_DAYS * 24 * 60 * 60 * 1000;

  const upstash = await upstashMultiExec([
    [
      'ZREVRANGEBYSCORE',
      CV_CLICK_EVENTS_KEY,
      nowMs,
      minMs,
      'LIMIT',
      0,
      limit,
    ],
  ]);

  if (!upstash) {
    return NextResponse.json(
      { ok: false, error: 'Upstash not configured' },
      { status: 500 }
    );
  }

  const zrangeResult = Array.isArray(upstash)
    ? (upstash[0] as any)?.result
    : null;

  const members: string[] = Array.isArray(zrangeResult)
    ? (zrangeResult as any[]).map((x) => String(x))
    : [];

  const events = members
    .map((member) => {
      // New JSON format
      if (member.startsWith('{')) {
        try {
          return JSON.parse(member);
        } catch {
          return null;
        }
      }
      // Legacy pipe-delimited format: `${timestampMs}|${browser}|${rand}`
      const [tsStr, browser] = member.split('|');
      const tsMs = Number(tsStr);
      if (!Number.isFinite(tsMs) || !browser) return null;
      return { timestamp: new Date(tsMs).toISOString(), browser };
    })
    .filter(Boolean);

  return NextResponse.json({
    ok: true,
    range: {
      start: new Date(minMs).toISOString(),
      end: new Date(nowMs).toISOString(),
    },
    limit,
    events,
  });
}

