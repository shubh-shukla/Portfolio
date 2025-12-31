import * as React from 'react';

import { mergeClasses } from '@/lib/utils';
import Typography from '@/components/general/typography';

interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ label, className, ...props }: TagProps, ref) => {
    return (
      <div
        className={mergeClasses(
          'inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1 text-gray-800 shadow-[0_10px_40px_-25px_rgba(15,23,42,0.25)] backdrop-blur dark:border-white/12 dark:bg-[rgba(8,12,24,0.9)] dark:text-white dark:shadow-[0_18px_55px_-26px_rgba(0,0,0,0.82)]',
          className
        )}
        {...props}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.18)]" />
        <Typography variant="body3" className="font-semibold">
          {label}
        </Typography>
      </div>
    );
  }
);

Tag.displayName = 'Tag';

export default Tag;
