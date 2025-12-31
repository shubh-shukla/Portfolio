'use client';

import { TechDetails } from '@/lib/types';
import Typography from '@/components/general/typography';
import Link from '@/components/navigation/link';
import ImageWrapper from '@/components/data-display/image-wrapper';

const TechDetails = ({ url, logo, darkModeLogo, label }: TechDetails) => {
  return (
    <div className="group flex flex-col items-center gap-3 rounded-2xl bg-white shadow-[0_20px_70px_-50px_rgba(15,23,42,0.35)] p-4 transition hover:-translate-y-1 hover:shadow-[0_24px_80px_-48px_rgba(15,23,42,0.4)] dark:border dark:border-white/12 dark:bg-[rgba(8,12,24,0.9)] dark:shadow-[0_28px_90px_-52px_rgba(0,0,0,0.82)] dark:hover:bg-[rgba(8,12,24,0.96)]">
      <Link noCustomization href={url} externalLink>
        <ImageWrapper
          src={logo}
          srcForDarkMode={darkModeLogo}
          alt={label}
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </Link>
      <Typography variant="body1" className="text-gray-800 dark:text-white">
        {label}
      </Typography>
    </div>
  );
};

export default TechDetails;
