import Script from 'next/script';
import { Space_Grotesk } from 'next/font/google';
import { Metadata } from 'next';

import './globals.css';
import Header from '@/components/layout/header';
import { Providers } from '@/lib/providers';
import Footer from '@/components/layout/footer';
import AnalyticsAutoTracker from '@/components/general/analytics-auto-tracker';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-sans' });

const title = 'Shubham Shukla | Frontend-Heavy Full Stack Engineer (React, React Native, Next.js)';
const description =
  'Frontend-heavy full stack engineer from Bengaluru, India — building production-grade products with React, React Native, and Next.js, backed by Node.';
const url = 'https://shubham-shukla.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  keywords: [
    'Frontend Developer',
    'Application Developer',
    'Full Stack Developer',
    'React Developer',
    'Next.js Developer',
    'React Native Developer',
    'iOS Developer',
    'Android Developer',
    'MERN Stack Developer',
    'Node.js Developer',
  ],
  creator: 'Shubham Shukla',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  openGraph: {
    type: 'website',
    url,
    title,
    description,
    siteName: title,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@shubh-shukla',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

const googleAnalyticsId = process.env.GOOGLE_ANALYTICS_ID;

// Privacy-friendly analytics (Umami Cloud).
//   NEXT_PUBLIC_UMAMI_WEBSITE_ID  — required to enable Umami
//   NEXT_PUBLIC_UMAMI_SRC         — optional, defaults to Umami Cloud script
const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
const umamiSrc =
  process.env.NEXT_PUBLIC_UMAMI_SRC || 'https://cloud.umami.is/script.js';

// Microsoft Clarity — heatmaps + session replay.
//   NEXT_PUBLIC_CLARITY_PROJECT_ID — required to enable Clarity
const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

// Storage host used by the /api/media proxy redirect. Exposing the host (not
// the service-role key) is safe and lets the browser warm DNS + TLS while the
// HTML is still parsing, shaving ~200–500 ms off the first image render.
const supabaseHost = (() => {
  try {
    return process.env.SUPABASE_URL ? new URL(process.env.SUPABASE_URL).origin : null;
  } catch {
    return null;
  }
})();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.className} bg-gray text-gray-900 antialiased dark:bg-gray dark:text-gray-100`}
      >
        {supabaseHost ? (
          <>
            <link rel="preconnect" href={supabaseHost} crossOrigin="anonymous" />
            <link rel="dns-prefetch" href={supabaseHost} />
          </>
        ) : null}
        {googleAnalyticsId ? (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            />
            <Script id="google-anayltics-script">
              {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', '${googleAnalyticsId}');
          `}
            </Script>
          </>
        ) : null}
        {umamiWebsiteId ? (
          <Script
            async
            defer
            src={umamiSrc}
            data-website-id={umamiWebsiteId}
            strategy="afterInteractive"
          />
        ) : null}
        {clarityProjectId ? (
          <Script id="ms-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityProjectId}");
            `}
          </Script>
        ) : null}
        <Providers>
          <Header />
          <main className="flex min-h-screen w-full flex-col">{children}</main>
          <Footer />
          <AnalyticsAutoTracker />
        </Providers>
      </body>
    </html>
  );
}
