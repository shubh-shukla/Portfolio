'use client';

import Button from '@/components/general/button';

const DownloadCV = () => {
  return (
    <Button onClick={() => window?.open('/files/Shubham_Sr_Software_Eng_CV.pdf', '_blank')}>
      Download CV
    </Button>
  );
};

export default DownloadCV;
