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

      // Coarse browser classification (we store only the bucket, not the full UA string).
      let browser = 'Other';
      if (/Edg\//.test(ua)) browser = 'Edge';
      else if (/OPR\//.test(ua) || /Opera/.test(ua)) browser = 'Opera';
      else if (/CriOS\//.test(ua) || /Chrome\//.test(ua)) browser = 'Chrome';
      else if (/Firefox\//.test(ua)) browser = 'Firefox';
      else if (/Safari\//.test(ua)) browser = 'Safari';

      const body = `cv_click=1&browser=${encodeURIComponent(browser)}`;

      if (nav?.sendBeacon) {
        nav.sendBeacon('/api/cv-click', body);
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
