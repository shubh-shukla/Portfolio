'use client';

import { ExperienceDetails as ExperienceDetailsType } from '@/lib/types';
import { mergeClasses } from '@/lib/utils';
import Typography from '@/components/general/typography';
import ImageWrapper from '@/components/data-display/image-wrapper';
import Reveal from '@/components/general/reveal';
import {
  formatDuration,
  formatRange,
} from '@/components/sections/experiences';

type AccentStyles = {
  dot: string;
  bar: string;
  ring: string;
  text: string;
};

type ExperienceMilestoneProps = {
  role: ExperienceDetailsType & { end: Date; months: number };
  index: number;
  longestMonths: number;
  accentStyles: AccentStyles;
};

// Soft radial glow colour per accent so content blends into the page bg
const ACCENT_GLOW: Record<string, string> = {
  'bg-sky-500':
    'bg-[radial-gradient(ellipse_at_left,rgba(56,189,248,0.18),rgba(56,189,248,0)_60%)]',
  'bg-indigo-500':
    'bg-[radial-gradient(ellipse_at_left,rgba(99,102,241,0.18),rgba(99,102,241,0)_60%)]',
  'bg-emerald-500':
    'bg-[radial-gradient(ellipse_at_left,rgba(16,185,129,0.18),rgba(16,185,129,0)_60%)]',
  'bg-amber-500':
    'bg-[radial-gradient(ellipse_at_left,rgba(245,158,11,0.18),rgba(245,158,11,0)_60%)]',
  'bg-fuchsia-500':
    'bg-[radial-gradient(ellipse_at_left,rgba(217,70,239,0.18),rgba(217,70,239,0)_60%)]',
  'bg-rose-500':
    'bg-[radial-gradient(ellipse_at_left,rgba(244,63,94,0.18),rgba(244,63,94,0)_60%)]',
};

const ExperienceMilestone = ({
  role,
  index,
  longestMonths,
  accentStyles,
}: ExperienceMilestoneProps) => {
  const widthPct = Math.max(8, (role.months / longestMonths) * 100);
  const glow = ACCENT_GLOW[accentStyles.dot] ?? '';
  const onLeft = index % 2 === 0;

  return (
    <li className="relative pl-14 md:pl-0">
      {/* Milestone dot on the rail */}
      <div
        className={mergeClasses(
          'absolute top-1.5 z-10 flex h-3.5 w-3.5 -translate-x-1/2 items-center justify-center rounded-full ring-4',
          'left-[19px] md:left-1/2',
          accentStyles.dot,
          accentStyles.ring
        )}
      >
        {role.currentlyWorkHere && (
          <span
            className={mergeClasses(
              'absolute inset-0 animate-ping rounded-full opacity-70',
              accentStyles.dot
            )}
          />
        )}
      </div>

      <div className="md:grid md:grid-cols-2 md:gap-12">
        <div
          className={mergeClasses(
            onLeft
              ? 'md:pr-12 md:text-right'
              : 'md:col-start-2 md:pl-12 md:text-left'
          )}
        >
          <Reveal delay={index * 80}>
            <div className="group/exp relative">
              {/* Soft accent glow that bleeds into the page */}
              <div
                aria-hidden
                className={mergeClasses(
                  'pointer-events-none absolute -top-8 -z-10 h-[140%] w-[120%] opacity-90 blur-2xl',
                  onLeft ? 'md:-right-10 md:left-auto -left-10' : '-left-10',
                  glow
                )}
              />

              {/* Logo */}
              <div
                className={mergeClasses(
                  'flex',
                  onLeft ? 'md:justify-end' : 'justify-start'
                )}
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-sm ring-1 ring-slate-200 dark:ring-white/10 sm:h-20 sm:w-20">
                  <ImageWrapper
                    src={role.logo}
                    srcForDarkMode={role.darkModeLogo}
                    alt={role.logoAlt}
                    width={80}
                    height={80}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>

              {/* Company + now badge */}
              <div
                className={mergeClasses(
                  'mt-4 flex flex-wrap items-center gap-3',
                  onLeft ? 'md:justify-end' : ''
                )}
              >
                <span
                  className={mergeClasses(
                    'text-base font-semibold tracking-wide sm:text-lg',
                    accentStyles.text
                  )}
                >
                  {role.company ?? role.logoAlt}
                </span>
                {role.currentlyWorkHere && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    Now
                  </span>
                )}
              </div>

          {/* Position */}
          <Typography
            variant="subtitle"
            className="mt-2 text-xl font-semibold leading-tight md:text-2xl"
          >
            {role.position}
          </Typography>

          {/* Meta row */}
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-slate-500 dark:text-white/55">
            <span>
              {formatRange(role.startDate, role.endDate, role.currentlyWorkHere)}
            </span>
            <span className="text-slate-300 dark:text-white/20">·</span>
            <span className="font-medium text-slate-600 dark:text-white/75">
              {formatDuration(role.months)}
            </span>
          </div>

          {/* Proportional duration bar */}
          <div
            className={mergeClasses(
              'mt-4 h-[3px] w-full max-w-md overflow-hidden rounded-full bg-slate-200/60 dark:bg-white/5',
              onLeft ? 'md:ml-auto' : ''
            )}
          >
            <div
              className={mergeClasses(
                'h-full rounded-full transition-all duration-1000 ease-out',
                accentStyles.bar,
                onLeft ? 'md:ml-auto' : ''
              )}
              style={{ width: `${widthPct}%` }}
            />
          </div>

          {/* Bullets */}
          <ul
            className={mergeClasses(
              'mt-5 flex flex-col gap-2 text-left text-[15px] leading-relaxed text-gray-700 dark:text-white/80',
              onLeft ? 'md:ml-auto md:items-start' : ''
            )}
          >
            {role.summary.map((s, i) => (
              <li key={i} className="relative max-w-2xl pl-4">
                <span
                  className={mergeClasses(
                    'absolute left-0 top-[10px] h-1 w-1 rounded-full opacity-70',
                    accentStyles.dot
                  )}
                />
                {s}
              </li>
            ))}
          </ul>

          {/* Skill chips */}
          {role.skills && role.skills.length > 0 && (
            <div
              className={mergeClasses(
                'mt-5 flex flex-wrap gap-1.5',
                onLeft ? 'md:justify-end' : ''
              )}
            >
              {role.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-md px-2 py-0.5 text-[11px] font-medium text-slate-600 ring-1 ring-slate-200/70 transition group-hover/exp:ring-slate-300 dark:text-white/70 dark:ring-white/10 dark:group-hover/exp:ring-white/20"
                >
                  {s}
                </span>
              ))}
            </div>
          )}
            </div>
          </Reveal>
        </div>
      </div>
    </li>
  );
};

export default ExperienceMilestone;
