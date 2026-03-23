import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

// Logs CV button clicks to Vercel function logs.
export async function POST(req: Request) {
  // Read the body (optional) so Vercel can fully consume the request.
  // We intentionally do not persist this data.
  try {
    await req.text();
  } catch {
    // Ignore body read failures.
  }

  console.log('CV_CLICK');
  return NextResponse.json({ ok: true }, { status: 200 });
}

