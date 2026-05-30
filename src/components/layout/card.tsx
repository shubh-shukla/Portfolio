import { mergeClasses } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = ({ className, children, ...props }: CardProps) => {
  return (
    <div
      className={mergeClasses(
        'card-animated glass-surface rounded-2xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
