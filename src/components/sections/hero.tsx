"use client";

import Image from 'next/image';

import ShubhamHeadshot from '/public/media/profile/headshot.webp';
import SocialIcons from '@/components/data-display/social-icons';
import Typography from '@/components/general/typography';
import Container from '@/components/layout/container';
import DownloadCV from '@/components/general/download-cv';
import Link from '@/components/navigation/link';
import Reveal from '@/components/general/reveal';
import { useParallax } from '@/hooks/use-parallax';
import { track, logGithubClick } from '@/lib/analytics';

/* iOS-26 / visionOS glass tokens — tuned for both light + dark themes.
   Light theme leans on white frost over soft pastel halos.
   Dark theme uses very low-opacity white over indigo/cyan/emerald halos. */

const glassChip =
  'relative inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ' +
  // light
  'bg-white/45 text-slate-900 ' +
  'shadow-[0_10px_30px_-18px_rgba(15,23,42,0.35),inset_0_1px_0_rgba(255,255,255,0.7)] ' +
  'backdrop-blur-2xl backdrop-saturate-[1.8] ' +
  // dark
  'dark:bg-white/[0.06] dark:text-white ' +
  'dark:shadow-[0_18px_60px_-30px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.18)]';

// Glass card: thicker frost, top specular line, subtle iridescent tint.
const glassCard =
  'relative overflow-hidden rounded-2xl p-4 transition duration-500 ease-out ' +
  // light
  'bg-white/40 ' +
  'shadow-[0_24px_70px_-28px_rgba(15,23,42,0.35),inset_0_1px_0_rgba(255,255,255,0.7)] ' +
  'backdrop-blur-2xl backdrop-saturate-[1.8] ' +
  // dark
  'dark:bg-white/[0.05] ' +
  'dark:shadow-[0_30px_90px_-40px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.14)] ' +
  // top specular highlight line
  'before:pointer-events-none before:absolute before:inset-x-4 before:top-0 before:h-px ' +
  'before:bg-gradient-to-r before:from-transparent before:via-white/70 before:to-transparent ' +
  'dark:before:via-white/25';

const ctaClass =
  'group/cta relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-5 py-2 ' +
  'text-sm font-semibold ' +
  // light: frosted glass pill with dark slate label, matches the chip /
  // card vocabulary instead of looking like a hard black button.
  // NOTE: opacity steps must use bracket syntax — Tailwind's default
  // opacity scale doesn't include /55, /45, /65 etc.
  'text-slate-900 bg-white/[0.55] ' +
  'shadow-[0_18px_50px_-22px_rgba(15,23,42,0.30),inset_0_1px_0_rgba(255,255,255,0.75)] ' +
  'backdrop-blur-2xl backdrop-saturate-[1.8] ' +
  // dark: flatter, calmer frost. Saturation pulled back so the indigo halo
  // behind doesn't paint the pill blue, and the heavy drop-shadow + inset
  // highlight are removed so it sits flush with the surrounding chips.
  'dark:bg-white/[0.07] dark:text-white ' +
  'dark:shadow-[0_8px_24px_-16px_rgba(0,0,0,0.6)] ' +
  'dark:backdrop-saturate-100 ' +
  'transition-all duration-300 ease-out ' +
  'hover:-translate-y-0.5 hover:bg-white/[0.7] ' +
  'dark:hover:bg-white/[0.12] ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--accent-indigo))] ' +
  // specular sheen on top half (light only — dark mode stays flat)
  'before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-1/2 ' +
  'before:rounded-t-xl before:bg-gradient-to-b before:from-white/60 before:via-white/15 before:to-white/0 ' +
  'dark:before:hidden';

const HeroSection = () => {
  const achievements = [
    { label: 'Stack', value: 'React · React Native · Next.js' },
    { label: 'Impact', value: '10+ products shipped' },
    { label: 'Leadership', value: 'Mentored squads across timezones' },
  ];

  const { ref: parallaxRef } = useParallax<HTMLDivElement>(0.12);

  return (
    <Container
      id="hero"
      className="relative overflow-hidden bg-transparent pb-24 pt-12 md:pt-16 lg:pb-32"
    >
      {/* Saturated halo blobs — these provide the colors that the frosted
          glass refracts. Both themes use the same hues but different opacity. */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[12%] top-2 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.45),rgba(14,165,233,0))] blur-3xl dark:opacity-80" />
        <div className="absolute right-[6%] top-0 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.45),rgba(99,102,241,0))] blur-3xl dark:opacity-80" />
        <div className="absolute bottom-[-8rem] left-[24%] h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.35),rgba(16,185,129,0))] blur-3xl dark:opacity-80" />
        <div className="absolute right-[18%] bottom-[-6rem] h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(244,114,182,0.34),rgba(244,114,182,0))] blur-3xl dark:opacity-80" />
        <div className="absolute left-[40%] top-[35%] h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.22),rgba(250,204,21,0))] blur-3xl dark:opacity-60" />
      </div>

      <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="z-10 flex flex-col gap-8">
          <Reveal className="flex flex-wrap items-center gap-3" delay={80}>
            <span className={glassChip}>
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Open to Staff/Senior roles
            </span>
            <span className={glassChip}>
              Shipping resilient products for high-stakes teams
            </span>
          </Reveal>

          <Reveal className="flex flex-col gap-4 max-w-3xl" delay={120}>
            <Typography
              variant="h1"
              className="text-balance text-gray-900 dark:text-white"
            >
              Hi, I&apos;m{' '}
              <span className="font-signature font-semibold tracking-tight text-indigo-600 dark:text-indigo-300">
                Shubham
              </span>
              &nbsp;
              <span className="inline-block animate-waving-hand"> 👋</span>
            </Typography>
            <Typography className="text-lg text-gray-700 md:text-xl dark:text-white/85">
              Frontend-heavy full stack engineer building calm, reliable experiences across web and
              mobile. I lead squads and ship production-grade products with React, React Native,
              and Next.js — backed by Node — obsessing over performance, accessibility, and
              thoughtful interfaces.
            </Typography>
          </Reveal>

          <Reveal className="flex flex-wrap items-center gap-3" delay={160}>
            <DownloadCV className={ctaClass} />
            <Link
              externalLink
              href="https://github.com/shubh-shukla"
              noCustomization
              className={ctaClass}
              onClick={() => {
                track('hero_view_github');
                logGithubClick('profile_hero', 'https://github.com/shubh-shukla');
              }}
            >
              View GitHub
            </Link>
            <Link
              href="#work"
              noCustomization
              className={ctaClass}
              onClick={() => track('hero_explore_work')}
            >
              Explore work
            </Link>
            <Link
              href="#contact"
              noCustomization
              className={ctaClass}
              onClick={() => track('hero_lets_talk')}
            >
              Let&apos;s talk
            </Link>
          </Reveal>

          {/* Achievement cards — alternating subtle 3D tilts so they feel
              like they're floating off the page at different angles. */}
          <div className="grid w-full grid-cols-1 gap-4 [perspective:1400px] md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((item, index) => {
              const tiltClass =
                index === 0
                  ? 'glass-tilt-soft'
                  : index === 1
                    ? '[transform:rotateX(2deg)_rotateY(0deg)] hover:[transform:rotateX(0deg)_translateZ(6px)] transition-transform duration-500'
                    : 'glass-tilt-mirror';
              return (
                <Reveal
                  key={index}
                  delay={140 + index * 80}
                  className={`${glassCard} ${tiltClass}`}
                >
                  {/* Iridescent diagonal wash, theme-aware. */}
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(99,102,241,0.18),rgba(244,114,182,0.10)_45%,rgba(16,185,129,0.14))] dark:bg-[linear-gradient(135deg,rgba(99,102,241,0.22),rgba(244,114,182,0.10)_45%,rgba(14,165,233,0.20))]" />
                  {/* Glossy top sheen */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/45 via-white/10 to-transparent dark:from-white/12 dark:via-white/4" />
                  <p className="relative text-xs font-semibold uppercase tracking-wide text-slate-700 dark:text-white/75">
                    {item.label}
                  </p>
                  <p className="relative mt-2 text-base font-semibold text-slate-900 dark:text-white">
                    {item.value}
                  </p>
                </Reveal>
              );
            })}
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

        {/* 3D glass scene with the headshot. Outer wrapper provides perspective,
            inner element tilts. Parallax on the outermost wrapper so the whole
            scene drifts with scroll. */}
        <div className="relative z-10 flex w-full justify-center glass-scene">
          <div
            className="relative w-full max-w-[460px] will-change-transform"
            ref={parallaxRef}
            style={{ transform: 'translate3d(0, var(--parallax-y, 0px), 0)' }}
          >
            {/* Animated conic color halo behind the frame — drives the
                refracted color through the frost. */}
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[40px] opacity-90 blur-3xl dark:opacity-100"
              style={{
                backgroundImage:
                  'conic-gradient(from 120deg at 50% 50%, rgba(14,165,233,0.45), rgba(99,102,241,0.55), rgba(244,114,182,0.40), rgba(16,185,129,0.40), rgba(250,204,21,0.30), rgba(14,165,233,0.45))',
              }}
            />

            {/* Tilted glass frame */}
            <div className="glass-tilt relative">
              {/* Layered shadow plate sits "behind" the glass to sell the float */}
              <div className="absolute inset-3 -z-10 rounded-[28px] bg-black/20 blur-2xl dark:bg-black/60" />

              <div className="relative overflow-hidden rounded-[28px] p-4 bg-white/35 backdrop-blur-2xl backdrop-saturate-[1.8] shadow-[0_40px_120px_-40px_rgba(15,23,42,0.45),inset_0_1px_0_rgba(255,255,255,0.7)] dark:bg-white/[0.05] dark:shadow-[0_50px_140px_-45px_rgba(0,0,0,1),inset_0_1px_0_rgba(255,255,255,0.14)]">
                {/* Top specular line spanning the bevel */}
                <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent dark:via-white/45" />
                {/* Iridescent diagonal sheen */}
                <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[linear-gradient(135deg,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0)_30%,rgba(255,255,255,0)_70%,rgba(255,255,255,0.18)_100%)] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0)_30%,rgba(255,255,255,0)_70%,rgba(255,255,255,0.08)_100%)]" />
                {/* Color-tint refraction overlay (theme-aware) */}
                <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[linear-gradient(160deg,rgba(99,102,241,0.10),rgba(244,114,182,0.06)_40%,rgba(16,185,129,0.08))] dark:bg-[linear-gradient(160deg,rgba(99,102,241,0.20),rgba(244,114,182,0.08)_40%,rgba(14,165,233,0.16))]" />

                <div
                  className="relative overflow-hidden rounded-2xl bg-[linear-gradient(145deg,rgba(99,102,241,0.10),rgba(16,185,129,0.10))] dark:bg-[linear-gradient(145deg,rgba(99,102,241,0.18),rgba(14,165,233,0.16))]"
                  style={{ transform: 'translateZ(40px)' }}
                >
                  <Image
                    src={ShubhamHeadshot}
                    alt="Portrait of Shubham Shukla"
                    className="h-[360px] w-full object-cover md:h-[420px]"
                    priority
                  />
                  {/* Subtle bottom darkening for depth */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent dark:from-black/55" />
                </div>

                {/* Floating mini-cards lifted on Z for depth */}
                <div
                  className="mt-4 grid grid-cols-2 gap-3 text-sm"
                  style={{ transform: 'translateZ(28px)' }}
                >
                  <div className={`${glassCard} p-3`}>
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(14,165,233,0.18),rgba(99,102,241,0.10))] dark:bg-[linear-gradient(135deg,rgba(14,165,233,0.22),rgba(99,102,241,0.14))]" />
                    <p className="relative text-[11px] font-semibold uppercase tracking-wide text-slate-700 dark:text-white/70">
                      Current Focus
                    </p>
                    <p className="relative mt-1 font-semibold text-slate-900 dark:text-white">
                      ACV Auctions · React.js · React Native
                    </p>
                  </div>
                  <div className={`${glassCard} p-3`}>
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(244,114,182,0.18),rgba(16,185,129,0.10))] dark:bg-[linear-gradient(135deg,rgba(244,114,182,0.22),rgba(16,185,129,0.16))]" />
                    <p className="relative text-[11px] font-semibold uppercase tracking-wide text-slate-700 dark:text-white/70">
                      Specialty
                    </p>
                    <p className="relative mt-1 font-semibold text-slate-900 dark:text-white">
                      Engineering, Performance, Leadership, IC depth
                    </p>
                  </div>
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
