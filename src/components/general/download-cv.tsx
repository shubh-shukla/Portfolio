'use client';

import Button from '@/components/general/button';

type DownloadCVProps = {
  className?: string;
};

const DownloadCV = ({ className }: DownloadCVProps) => {
  return (
    <Button
      className={className}
      onClick={() => window?.open('/files/Shubham_Sr_Software_Eng_CV.pdf', '_blank')}
    >
      Download CV
    </Button>
  );
};

export default DownloadCV;
