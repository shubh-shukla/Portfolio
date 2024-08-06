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
    <Card className="mx-auto flex flex-col justify-between items-center gap-6 p-8 md:w-2/3 md:p-12 lg:w-1/3">
      <div className="mx-auto flex flex-col justify-between items-center gap-6">
        <Image className="rounded-full" src={personAvatar!} alt={`${personName} avatar`}></Image>
        <Typography>&quot;{testimonial}&quot;</Typography>
      </div>
      <div className="flex w-full flex-col gap-1">
        <Typography
          variant="subtitle"
          className="w-full text-center font-semibold text-gray-900"
        >
          {personName}
        </Typography>
        <Typography variant="body3" className="w-full text-center">
          {title}
        </Typography>
        <Typography variant="body3" className="w-full text-center">
          {company}
        </Typography>
      </div>
    </Card >
  );
};

export default TestimonialDetails;
