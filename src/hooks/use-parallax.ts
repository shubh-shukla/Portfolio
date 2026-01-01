import { useEffect, useRef } from 'react';

export function useParallax<T extends HTMLElement>(factor = 0.12) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const update = () => {
      const rect = node.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const offset = elementCenter - viewportCenter;
      const translateY = -offset * factor;
      node.style.setProperty('--parallax-y', `${translateY}px`);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [factor]);

  return { ref } as const;
}
