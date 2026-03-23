'use client';

import Button from '@/components/general/button';
import Link from 'next/link';
import { EXTERNAL_LINKS } from '@/lib/data';

type DownloadCVProps = {
  className?: string;
};

const DownloadCV = ({ className }: DownloadCVProps) => {
  const handleCvClick = () => {
    try {
      const nav = globalThis.navigator as any;
      const ua = nav?.userAgent || '';

      // Coarse browser bucket.
      let browser = 'Other';
      if (/Edg\//.test(ua)) browser = 'Edge';
      else if (/OPR\//.test(ua) || /Opera/.test(ua)) browser = 'Opera';
      else if (/CriOS\//.test(ua) || /Chrome\//.test(ua)) browser = 'Chrome';
      else if (/Firefox\//.test(ua)) browser = 'Firefox';
      else if (/Safari\//.test(ua)) browser = 'Safari';

      // Coarse OS bucket.
      let os = 'Other';
      if (/Windows/.test(ua)) os = 'Windows';
      else if (/Android/.test(ua)) os = 'Android';
      else if (/iPhone|iPad|iPod/.test(ua)) os = 'iOS';
      else if (/Mac OS/.test(ua)) os = 'macOS';
      else if (/Linux/.test(ua)) os = 'Linux';
      else if (/CrOS/.test(ua)) os = 'ChromeOS';

      const params = new URLSearchParams({
        browser,
        os,
        language: nav?.language || '',
        referrer: document.referrer || '',
        screen: `${screen.width}x${screen.height}`,
        timezone: Intl?.DateTimeFormat?.()?.resolvedOptions?.()?.timeZone || '',
        mobile: String(nav?.maxTouchPoints > 0),
      });
      const body = params.toString();

      if (nav?.sendBeacon) {
        const blob = new Blob([body], {
          type: 'application/x-www-form-urlencoded',
        });
        nav.sendBeacon('/api/cv-click', blob);
        return;
      }

      void fetch('/api/cv-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
        keepalive: true,
      });
    } catch {
      // Intentionally ignore logging failures.
    }
  };

  return (
    <Button
      className={className}
      // onClick={() => window?.open('/files/Shubham_Sr_Software_Eng_CV.pdf', '_blank')}
      asChild
    >
      <Link
        href={EXTERNAL_LINKS.LINKEDIN}
        target="_blank"
        rel="noopener noreferrer"
        prefetch={false}
        onClick={handleCvClick}
      >
        Get My CV
      </Link>
    </Button>
  );
};

export default DownloadCV;
