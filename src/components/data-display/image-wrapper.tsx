'use client';

import { useEffect, useState } from 'react';
import Image, { ImageProps, StaticImageData } from 'next/image';
import { useTheme } from 'next-themes';

type ImageWrapperProps = ImageProps & {
  srcForDarkMode?: string | StaticImageData;
};

const ImageWrapper = ({
  srcForDarkMode,
  src,
  alt,
  ...props
}: ImageWrapperProps) => {
  // Ref :: https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const finalSrc = theme === 'dark' ? srcForDarkMode || src : src;

  // Bypass Next's image optimizer for proxied/private-bucket media so the
  // browser follows the 307 redirect directly to the Supabase CDN.
  const isProxied =
    typeof finalSrc === 'string' &&
    (finalSrc.startsWith('/api/media/') || finalSrc.startsWith('http'));

  return (
    <Image
      src={finalSrc!}
      alt={alt}
      unoptimized={isProxied}
      {...props}
    />
  );
};

export default ImageWrapper;
