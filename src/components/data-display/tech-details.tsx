'use client';

import { TechDetails } from '@/lib/types';
import Typography from '@/components/general/typography';
import Link from '@/components/navigation/link';
import ImageWrapper from '@/components/data-display/image-wrapper';

const TechDetails = ({ url, logo, darkModeLogo, label }: TechDetails) => {
  return (
    <div className="tilt-hover group flex flex-col items-center gap-3 rounded-2xl border border-transparent bg-transparent p-4 shadow-none transition hover:-translate-y-1">
      <Link noCustomization href={url} externalLink>
        <ImageWrapper
          src={logo}
          srcForDarkMode={darkModeLogo}
          alt={label}
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </Link>
      <Typography variant="body1" className="text-center text-gray-800 dark:text-white">
        {label}
      </Typography>
    </div>
  );
};

export default TechDetails;
