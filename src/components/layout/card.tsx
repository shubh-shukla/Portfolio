import { mergeClasses } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = ({ className, children, ...props }: CardProps) => {
  return (
    <div
      className={mergeClasses(
        'card-animated relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_10px_60px_-40px_rgba(15,23,42,0.35)] backdrop-blur transition-all duration-500 ease-[cubic-bezier(0.4,0.14,0.3,1)] hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_18px_90px_-48px_rgba(15,23,42,0.5)] dark:border-white/10 dark:bg-[rgba(8,12,24,0.92)] dark:shadow-[0_32px_90px_-50px_rgba(0,0,0,0.8)] dark:hover:shadow-[0_40px_120px_-60px_rgba(0,0,0,0.9)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
