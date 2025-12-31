'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

import { mergeClasses } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={mergeClasses(
          'relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl border border-gray-200/70 bg-[linear-gradient(120deg,rgb(var(--app-gray-900)),rgb(17,24,39))] px-5 py-2 text-sm font-semibold text-gray-50 shadow-[0_20px_70px_-25px_rgba(17,24,39,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_25px_70px_-24px_rgba(88,80,236,0.7)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--accent-indigo))] active:translate-y-0',
          'before:absolute before:inset-0 before:-z-10 before:bg-[linear-gradient(120deg,rgba(14,165,233,0.65),rgba(99,102,241,0.65),rgba(16,185,129,0.75))] before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;
