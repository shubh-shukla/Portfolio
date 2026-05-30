'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

type LazyMountProps = {
  /** Render this skeleton until the wrapper is near the viewport. */
  placeholder?: ReactNode;
  /** rootMargin passed to IntersectionObserver. Default: 600px below viewport. */
  rootMargin?: string;
  /** Wrapper class — given to both placeholder and children's container. */
  className?: string;
  children: ReactNode;
};

/**
 * Defers mounting `children` until the wrapper element scrolls within
 * `rootMargin` of the viewport. Once mounted, it stays mounted.
 *
 * Use to keep heavy components (image carousels, video players, charts)
 * out of the initial bundle execution path.
 */
const LazyMount = ({
  placeholder,
  rootMargin = '600px 0px',
  className,
  children,
}: LazyMountProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    if (shouldMount) return;
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShouldMount(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldMount(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [rootMargin, shouldMount]);

  return (
    <div ref={ref} className={className}>
      {shouldMount ? children : placeholder ?? null}
    </div>
  );
};

export default LazyMount;
