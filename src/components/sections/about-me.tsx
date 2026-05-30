import Image from 'next/image';

import AboutMeImage from '/public/media/profile/about.webp';
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
            <div className="absolute inset-0 -z-10 rounded-[28px] bg-[conic-gradient(from_160deg_at_50%_50%,rgba(14,165,233,0.18),rgba(99,102,241,0.26),rgba(244,114,182,0.18),rgba(16,185,129,0.18),rgba(14,165,233,0.18))] opacity-90 blur-3xl" />
            <div className="glass-surface relative overflow-hidden rounded-[24px]">
              <Image
                src={AboutMeImage}
                alt="Featured Image"
                className="h-[360px] w-full object-cover md:h-[440px] lg:h-[500px]"
                priority
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent dark:from-black/55" />
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
              Five years in, I split my time between leading squads and writing the gnarly bits
              myself. Comfortable owning a feature end-to-end — from a half-baked Figma to a
              shipped, instrumented build on the App Store.
            </Typography>
            <Typography>
              Started in 2021, since then I&apos;ve modernized stacks, untangled legacy codebases,
              and helped teams launch features that actually moved the needle.
            </Typography>
            <Typography>
              When I&apos;m not in build mode, I share learnings, mentor, and prototype new
              interactions. Always exploring how to make complex systems feel effortless.
            </Typography>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="glass-chip rounded-full px-3 py-1">React · React Native · Next.js</span>
            <span className="glass-chip rounded-full px-3 py-1">Node · APIs · Data layer</span>
            <span className="glass-chip rounded-full px-3 py-1">DX & Performance</span>
            <span className="glass-chip rounded-full px-3 py-1">Team leadership</span>
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
