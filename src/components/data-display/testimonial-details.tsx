import Image from 'next/image';

import { TestimonialDetails as TestimonialDetailsProps } from '@/lib/types';
import Typography from '@/components/general/typography';
import Card from '@/components/layout/card';

const TestimonialDetails = ({
  personName,
  personAvatar,
  testimonial,
  title,
  company,
}: TestimonialDetailsProps) => {
  return (
    <Card className="mx-auto flex flex-col items-center justify-between gap-6 p-8 text-gray-800 md:p-10 dark:text-white">
      <div className="mx-auto flex flex-col items-center justify-between gap-6">
        <Image className="h-20 w-20 rounded-full" src={personAvatar!} alt={`${personName} avatar`}></Image>
        <Typography className="text-center text-gray-700 dark:text-white/90">&quot;{testimonial}&quot;</Typography>
      </div>
      <div className="flex w-full flex-col gap-1 text-center">
        <Typography
          variant="subtitle"
          className="w-full font-semibold"
        >
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
  );
};

export default TestimonialDetails;
