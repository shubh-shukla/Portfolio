import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { mergeClasses } from '@/lib/utils';

const iconButtonVariants = cva(
  'flex justify-center items-center rounded-lg p-1.5 transition-colors duration-200 bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300 border border-gray-200 [&_svg]:stroke-gray-700 [&_svg]:h-5 [&_svg]:w-5 dark:bg-[rgba(8,12,24,0.9)] dark:text-white dark:hover:bg-[rgba(8,12,24,0.96)] dark:active:bg-[rgba(8,12,24,1)] dark:border-white/12 dark:[&_svg]:stroke-white',
  {
    variants: {
      size: {
        md: 'h-9 w-9 [&_svg]:w-5 [&_svg]:h-5',
        lg: 'h-11 w-11 [&_svg]:w-6 [&_svg]:h-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean;
  showTooltip?: boolean;
  tooltipText?: string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      size,
      asChild = false,
      showTooltip = false,
      tooltipText = '',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={mergeClasses(
          'relative',
          iconButtonVariants({ size }),
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
        {showTooltip && tooltipText.length > 0 && (
          <span className="absolute -top-8 rounded-lg bg-gray-200 px-2 py-1 text-sm">
            {tooltipText}
          </span>
        )}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default IconButton;
