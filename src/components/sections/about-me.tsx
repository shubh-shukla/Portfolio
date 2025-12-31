import Image from 'next/image';

import AboutMeImage from '/public/images/aboutme-image.webp';
import Tag from '@/components/data-display/tag';
import Container from '@/components/layout/container';
import Typography from '@/components/general/typography';
import Link from '@/components/navigation/link';
import { EXTERNAL_LINKS } from '@/lib/data';

const AboutMeSection = () => {
  return (
    <Container
      className="relative overflow-hidden"
      id="about"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-80">
        <div className="absolute left-[-10%] top-1/4 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.24),rgba(14,165,233,0))] blur-3xl" />
        <div className="absolute right-[-6%] bottom-10 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.22),rgba(99,102,241,0))] blur-3xl" />
      </div>

      <div className="self-center">
        <Tag label="About me" />
      </div>

      <div className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Image */}
        <div className="relative flex justify-center lg:order-last">
          <div className="relative w-full max-w-[460px]">
            <div className="absolute inset-0 -z-10 rounded-[28px] bg-[conic-gradient(from_160deg_at_50%_50%,rgba(14,165,233,0.12),rgba(99,102,241,0.18),rgba(16,185,129,0.12),rgba(14,165,233,0.12))] opacity-90 blur-2xl" />
            <div className="relative overflow-hidden rounded-[24px] border border-white/15 bg-white/10 shadow-[0_28px_120px_-50px_rgba(15,23,42,0.9)] backdrop-blur">
              <Image
                src={AboutMeImage}
                alt="Featured Image"
                className="h-[360px] w-full object-cover md:h-[440px] lg:h-[500px]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray/45 via-transparent" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-6">
          <Typography variant="h3">
            Curious about me? Here you have it:
          </Typography>
          <div className="grid gap-4">
            <Typography>
              Mobile-first engineer shipping calm, reliable products across React Native, Next.js, and Node. I obsess over performance, accessibility, and delightful interactions.
            </Typography>
            <Typography>
              Started in 2021, since then I&apos;ve shipped across iOS/Android/web, modernized stacks, and led teams to launch features with measurable impact.
            </Typography>
            <Typography>
              When I&apos;m not in build mode, I share learnings, mentor, and prototype new interactions. Always exploring how to make complex systems feel effortless.
            </Typography>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-gray-800 dark:border-white/12 dark:bg-[rgba(8,12,24,0.9)] dark:text-white">React Native · Next.js · Node</span>
            <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-gray-800 dark:border-white/12 dark:bg-[rgba(8,12,24,0.9)] dark:text-white">DX & Performance</span>
            <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-gray-800 dark:border-white/12 dark:bg-[rgba(8,12,24,0.9)] dark:text-white">Team leadership</span>
          </div>
          <Typography>
            Find me on{' '}
            <Link
              noCustomization
              externalLink
              withUnderline
              href={EXTERNAL_LINKS.LINKEDIN}
              className="text-inherit"
            >
              Linkedin
            </Link>{' '}
            or follow builds on{' '}
            <Link
              noCustomization
              externalLink
              withUnderline
              href={EXTERNAL_LINKS.GITHUB}
              className="text-inherit"
            >
              GitHub
            </Link>
            .
          </Typography>
        </div>
      </div>
    </Container>
  );
};

export default AboutMeSection;
