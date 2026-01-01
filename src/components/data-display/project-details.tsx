import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

import { ProjectDetails as ProjectDetailsType } from '@/lib/types';
import { mergeClasses } from '@/lib/utils';
import Typography from '@/components/general/typography';
import Link from '@/components/navigation/link';
import Tag from '@/components/data-display/tag';
import Card from '@/components/layout/card';

type ProjectDetailsProps = ProjectDetailsType & {
  layoutType: 'default' | 'reverse';
};

const ProjectDetails = ({
  name,
  description,
  technologies,
  url,
  previewImage,
  layoutType = 'default',
}: ProjectDetailsProps) => {
  return (
    <Card className="mx-auto flex w-full max-w-6xl flex-col overflow-hidden md:flex-row">
      {/* Image */}
      <div
        className={mergeClasses(
          'group flex items-center justify-center bg-white/70 p-6 md:w-1/2 lg:p-10 dark:bg-[rgba(6,8,14,0.92)] dark:border dark:border-white/10',
          layoutType === 'default'
            ? 'md:rounded-l-2xl md:border-r md:border-white/10'
            : 'md:order-last md:rounded-r-2xl md:border-l md:border-white/10'
        )}
      >
        <Link noCustomization href={url} externalLink>
          <Image
            src={previewImage}
            width={480}
            height={260}
            alt={`${name} preview`}
            className="rounded-xl shadow-[0_20px_80px_-50px_rgba(0,0,0,0.8)] transition duration-500 group-hover:scale-[1.03]"
            style={{ objectFit: 'cover' }}
          />
        </Link>
      </div>

      {/* Content */}
      <div
        className={mergeClasses(
          'flex flex-col gap-6 p-8 md:w-1/2 lg:p-12 text-gray-800 dark:text-white',
          layoutType === 'default' ? '' : 'md:order-first'
        )}
      >
        <Typography variant="subtitle" className="font-semibold">
          {name}
        </Typography>
        <Typography className="text-gray-700 dark:text-white/85">{description}</Typography>
        <div className="flex flex-wrap gap-2">
          {technologies?.map((technology, index) => (
            <Tag key={index} label={technology} />
          ))}
        </div>
        <Link
          href={url}
          noCustomization
          className="self-start rounded-lg p-2 text-gray-700 hover:bg-gray-100 [&_svg]:stroke-gray-700 dark:text-white dark:hover:bg-white/10 dark:[&_svg]:stroke-white"
          externalLink
        >
          <ExternalLink />
        </Link>
      </div>
    </Card>
  );
};

export default ProjectDetails;
