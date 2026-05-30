import { ImageResponse } from 'next/server';

export const runtime = 'edge';
export const alt =
  'Shubham Shukla — Frontend-Heavy Full Stack Engineer (React, React Native, Next.js)';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background:
            'radial-gradient(circle at 20% 20%, #1e293b 0%, #0f172a 55%, #020617 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #38bdf8, #6366f1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            SS
          </div>
          <div style={{ fontSize: 28, opacity: 0.85, letterSpacing: -0.5 }}>
            shubham-shukla.vercel.app
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Shubham Shukla
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 500,
              lineHeight: 1.2,
              letterSpacing: -1,
              color: '#cbd5e1',
            }}
          >
            Frontend-Heavy Full Stack Engineer
          </div>
          <div
            style={{
              fontSize: 28,
              color: '#94a3b8',
              letterSpacing: -0.3,
            }}
          >
            React · React Native · Next.js · Node
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 16,
            fontSize: 22,
            color: '#cbd5e1',
          }}
        >
          {['Bengaluru, India', '7+ years shipping production apps'].map((t) => (
            <div
              key={t}
              style={{
                padding: '10px 20px',
                borderRadius: 999,
                border: '1px solid rgba(148,163,184,0.35)',
                background: 'rgba(15,23,42,0.55)',
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
