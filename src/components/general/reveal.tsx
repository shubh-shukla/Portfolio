'use client';

import * as React from 'react';

import { mergeClasses } from '@/lib/utils';
import { useReveal } from '@/hooks/use-reveal';

type RevealProps<T extends keyof JSX.IntrinsicElements = 'div'> = {
  as?: T;
  delay?: number;
  /**
   * If true, render visible immediately and skip the fade-in entirely.
   * Use for above-the-fold content so first paint isn't gated on JS.
   */
  immediate?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>;

const Reveal = <T extends keyof JSX.IntrinsicElements = 'div'>(
  { as, delay = 0, immediate = false, className, children, ...rest }: RevealProps<T>
) => {
  const Comp = (as || 'div') as React.ElementType;
  const { ref, visible, style } = useReveal<HTMLElement>(delay);
  const isVisible = immediate || visible;

  return (
    <Comp
      ref={immediate ? undefined : ref}
      className={mergeClasses(!immediate && 'reveal', isVisible && 'reveal-visible', className)}
      style={immediate ? undefined : style}
      {...rest}
    >
      {children}
    </Comp>
  );
};

export default Reveal;
