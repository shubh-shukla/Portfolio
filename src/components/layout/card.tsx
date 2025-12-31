import { mergeClasses } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = ({ className, children, ...props }: CardProps) => {
  return (
    <div
      className={mergeClasses(
        'relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_10px_60px_-40px_rgba(15,23,42,0.35)] backdrop-blur dark:border-white/10 dark:bg-[rgba(8,12,24,0.92)] dark:shadow-[0_32px_90px_-50px_rgba(0,0,0,0.8)]',
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-white/0 dark:from-white/8 dark:via-white/4 dark:to-white/0" />
      {children}
    </div>
  );
};

export default Card;
