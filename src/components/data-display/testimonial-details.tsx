import Image from 'next/image';

import { TestimonialDetails as TestimonialDetailsProps } from '@/lib/types';
import Typography from '@/components/general/typography';
import Card from '@/components/layout/card';

type Props = TestimonialDetailsProps & {
  /** Index of this card on the cylinder (0-based). */
  cylinderIndex?: number;
  /** Total cards on the cylinder. */
  cylinderTotal?: number;
};

const TestimonialDetails = ({
  personName,
  personAvatar,
  testimonial,
  title,
  company,
  cylinderIndex,
  cylinderTotal,
}: Props) => {
  // Compute fan angle for this card. Cards curve OUTWARD (convex from viewer)
  // so the row reads like the inside of a dome — left card tilts left, right
  // card tilts right.
  const halfArc = 26; // degrees
  const angle =
    typeof cylinderIndex === 'number' && typeof cylinderTotal === 'number' && cylinderTotal > 1
      ? halfArc - (cylinderIndex / (cylinderTotal - 1)) * (halfArc * 2)
      : 0;

  // Curve style only kicks in on md+ — mobile uses a plain stack.
  const curveStyle: React.CSSProperties = {
    // CSS variables consumed by the md:[transform:...] arbitrary value below.
    ['--ang' as never]: `${angle}deg`,
  };

  return (
    <div
      style={curveStyle}
      className="origin-center transition-transform duration-500 ease-out hover:[transform:rotateY(0deg)_translateZ(40px)] md:[transform:rotateY(var(--ang))_translateZ(0)]"
    >
      <Card className="mx-auto flex h-full flex-col items-center justify-between gap-6 p-8 text-gray-800 md:p-10 dark:text-white">
        <div className="mx-auto flex flex-col items-center justify-between gap-6">
          <Image
            className="h-20 w-20 rounded-full"
            src={personAvatar!}
            alt={`${personName} avatar`}
            width={80}
            height={80}
            unoptimized
          />
          <Typography className="text-center text-gray-700 dark:text-white/90">
            &quot;{testimonial}&quot;
          </Typography>
        </div>
        <div className="flex w-full flex-col gap-1 text-center">
          <Typography variant="subtitle" className="w-full font-semibold">
            {personName}
          </Typography>
          <Typography variant="body3" className="w-full text-gray-700 dark:text-white/80">
            {title}
          </Typography>
          <Typography variant="body3" className="w-full text-gray-700 dark:text-white/80">
            {company}
          </Typography>
        </div>
      </Card>
    </div>
  );
};

export default TestimonialDetails;
