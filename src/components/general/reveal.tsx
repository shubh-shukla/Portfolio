'use client';

import * as React from 'react';

import { mergeClasses } from '@/lib/utils';
import { useReveal } from '@/hooks/use-reveal';

type RevealProps<T extends keyof JSX.IntrinsicElements = 'div'> = {
  as?: T;
  delay?: number;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>;

const Reveal = <T extends keyof JSX.IntrinsicElements = 'div'>(
  { as, delay = 0, className, children, ...rest }: RevealProps<T>
) => {
  const Comp = (as || 'div') as React.ElementType;
  const { ref, visible, style } = useReveal<HTMLElement>(delay);

  return (
    <Comp
      ref={ref}
      className={mergeClasses('reveal', visible && 'reveal-visible', className)}
      style={style}
      {...rest}
    >
      {children}
    </Comp>
  );
};

export default Reveal;
