'use client';

import Button from '@/components/general/button';
import Link from 'next/link';
import { EXTERNAL_LINKS } from '@/lib/data';

type DownloadCVProps = {
  className?: string;
};

const DownloadCV = ({ className }: DownloadCVProps) => {
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
      >
        Get My CV
      </Link>
    </Button>
  );
};

export default DownloadCV;
