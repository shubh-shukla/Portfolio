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
      if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
        navigator.sendBeacon('/api/cv-click', 'cv_click=1');
        return;
      }

      void fetch('/api/cv-click', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: 'cv_click=1',
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
