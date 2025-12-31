import Image from 'next/image';

import ShubhamHeadshot from '/public/images/shubham-headshot.webp';
import SocialIcons from '@/components/data-display/social-icons';
import Typography from '@/components/general/typography';
import Container from '@/components/layout/container';
import DownloadCV from '@/components/general/download-cv';
import Button from '@/components/general/button';
import Link from '@/components/navigation/link';

const HeroSection = () => {
  const achievements = [
    { label: 'Full-stack / Mobile', value: 'React Native · Next.js · Node' },
    { label: 'Impact', value: '10+ products shipped' },
    { label: 'Leadership', value: 'Mentored squads across timezones' },
  ];

  return (
    <Container
      id="hero"
      className="relative overflow-hidden bg-transparent pb-24 pt-12 md:pt-16 lg:pb-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-10 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.20),rgba(14,165,233,0))] blur-3xl" />
        <div className="absolute right-8 top-6 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.22),rgba(79,70,229,0))] blur-3xl" />
        <div className="absolute bottom-[-6rem] left-1/3 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.18),rgba(16,185,129,0))] blur-3xl" />
      </div>

      <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="z-10 flex flex-col gap-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-sm backdrop-blur">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Open to Staff/Senior roles
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-800 shadow-sm backdrop-blur dark:border-white/15 dark:bg-[rgba(8,12,24,0.9)] dark:text-white">
              Shipping resilient products for high-stakes teams
            </span>
          </div>

          <div className="flex flex-col gap-4 max-w-3xl">
            <Typography
              variant="h1"
              className="text-balance text-gray-900 dark:text-white"
            >
              Hi, I&apos;m Shubham.
              <span className="inline-block animate-waving-hand"> 👋</span>
            </Typography>
            <Typography className="text-lg text-gray-700 md:text-xl dark:text-white/85">
              Senior full-stack engineer who builds calm, reliable experiences for mobile and web.
              I lead squads, ship across React Native, React.js, Next.js, and Node, and obsess over
              performance, accessibility, and thoughtful interfaces.
            </Typography>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <DownloadCV />
            <Button
              asChild
              className="border border-gray-900 bg-gray-900 text-white shadow-[0_18px_60px_-32px_rgba(15,23,42,0.6)] hover:shadow-[0_22px_70px_-30px_rgba(15,23,42,0.75)] dark:border-white/25 dark:bg-white/12 dark:text-white dark:shadow-[0_18px_60px_-32px_rgba(79,70,229,0.7)] dark:hover:border-white/35 dark:hover:bg-white/16 dark:hover:shadow-[0_22px_70px_-30px_rgba(79,70,229,0.9)] after:pointer-events-none after:absolute after:inset-[-1px] after:rounded-xl after:border after:border-[rgba(255,255,255,0.25)] after:opacity-60 after:blur-[0.5px]"
            >
              <Link externalLink href="https://github.com/shubh-shukla" noCustomization>
                View GitHub
              </Link>
            </Button>
            <Button
              asChild
              className="border border-gray-300 bg-white text-gray-900 hover:border-gray-400 hover:bg-gray-50 after:pointer-events-none after:absolute after:inset-[-1px] after:rounded-xl after:border after:border-[rgba(255,255,255,0.18)] after:opacity-60 after:blur-[0.5px] dark:border-white/14 dark:bg-[rgba(8,12,24,0.9)] dark:text-white dark:hover:border-white/24 dark:hover:bg-[rgba(8,12,24,0.96)]"
            >
              <Link href="#work" noCustomization>
                Explore work
              </Link>
            </Button>
            <Button
              asChild
              className="border border-gray-300 bg-white text-gray-900 hover:border-gray-400 hover:bg-gray-50 after:pointer-events-none after:absolute after:inset-[-1px] after:rounded-xl after:border after:border-[rgba(255,255,255,0.18)] after:opacity-60 after:blur-[0.5px] dark:border-white/14 dark:bg-[rgba(8,12,24,0.9)] dark:text-white dark:hover:border-white/24 dark:hover:bg-[rgba(8,12,24,0.96)]"
            >
              <Link href="#contact" noCustomization>
                Let&apos;s talk
              </Link>
            </Button>
          </div>

          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((item, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl border border-gray-200/70 bg-white/80 p-4 shadow-[0_18px_60px_-38px_rgba(15,23,42,0.25)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_24px_70px_-36px_rgba(15,23,42,0.35)] dark:border-white/12 dark:bg-[rgba(8,12,24,0.9)] dark:shadow-[0_28px_90px_-44px_rgba(0,0,0,0.85)] dark:hover:shadow-[0_30px_100px_-46px_rgba(0,0,0,0.9)]"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/50 via-white/30 to-white/0 dark:from-white/8 dark:via-white/4 dark:to-white/0" />
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-white/80">
                  {item.label}
                </p>
                <p className="mt-2 text-base font-semibold text-gray-900 drop-shadow-[0_1px_3px_rgba(255,255,255,0.35)] dark:text-white dark:drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700 dark:text-white/80">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                </span>
              </div>
              <span>Based in Bengaluru · Leading distributed teams</span>
            </div>
            <SocialIcons />
          </div>
        </div>

        <div className="relative z-10 flex w-full justify-center">
          <div className="relative w-full max-w-[440px]">
            <div className="absolute inset-0 -z-10 rounded-[32px] bg-[conic-gradient(from_120deg_at_50%_50%,rgba(14,165,233,0.1),rgba(99,102,241,0.22),rgba(16,185,129,0.16),rgba(14,165,233,0.1))] opacity-80 blur-3xl" />
            <div className="relative overflow-hidden rounded-[28px] border border-gray-200/70 bg-white/85 p-4 shadow-[0_30px_120px_-50px_rgba(15,23,42,0.35)] backdrop-blur dark:border-white/15 dark:bg-white/8 dark:shadow-[0_40px_140px_-55px_rgba(15,23,42,1)]">
              <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(145deg,rgba(99,102,241,0.08),rgba(16,185,129,0.08))]">
                <Image
                  src={ShubhamHeadshot}
                  alt="Portrait of Shubham Shukla"
                  className="h-[360px] w-full object-cover md:h-[420px]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray/40 via-transparent" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-700 dark:text-white/80">
                <div className="rounded-xl border border-gray-200/70 bg-white/80 px-3 py-2 dark:border-white/15 dark:bg-white/10">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-white/70">
                    Current Focus
                  </p>
                  <p className="mt-1 font-semibold text-gray-900 drop-shadow-[0_1px_3px_rgba(255,255,255,0.35)] dark:text-white dark:drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]">
                    ACV Auctions · React Native
                  </p>
                </div>
                <div className="rounded-xl border border-gray-200/70 bg-white/80 px-3 py-2 dark:border-white/15 dark:bg-white/10">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-white/70">
                    Specialty
                  </p>
                  <p className="mt-1 font-semibold text-gray-900 drop-shadow-[0_1px_3px_rgba(255,255,255,0.35)] dark:text-white dark:drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]">
                    Individual Contributor, Tech Freak, Performance, Leadership
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HeroSection;
