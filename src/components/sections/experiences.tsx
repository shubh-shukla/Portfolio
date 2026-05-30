'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { EXPERIENCES } from '@/lib/data';
import { ExperienceDetails as ExperienceDetailsType } from '@/lib/types';
import { mergeClasses } from '@/lib/utils';
import Tag from '@/components/data-display/tag';
import Typography from '@/components/general/typography';
import Container from '@/components/layout/container';
import ExperienceMilestone from '@/components/data-display/experience-details';

const ACCENT_STYLES: Record<
  NonNullable<ExperienceDetailsType['accent']>,
  { dot: string; bar: string; ring: string; text: string }
> = {
  sky: {
    dot: 'bg-sky-500',
    bar: 'bg-sky-500',
    ring: 'ring-sky-400/30',
    text: 'text-sky-600 dark:text-sky-300',
  },
  indigo: {
    dot: 'bg-indigo-500',
    bar: 'bg-indigo-500',
    ring: 'ring-indigo-400/30',
    text: 'text-indigo-600 dark:text-indigo-300',
  },
  emerald: {
    dot: 'bg-emerald-500',
    bar: 'bg-emerald-500',
    ring: 'ring-emerald-400/30',
    text: 'text-emerald-600 dark:text-emerald-300',
  },
  amber: {
    dot: 'bg-amber-500',
    bar: 'bg-amber-500',
    ring: 'ring-amber-400/30',
    text: 'text-amber-600 dark:text-amber-300',
  },
  fuchsia: {
    dot: 'bg-fuchsia-500',
    bar: 'bg-fuchsia-500',
    ring: 'ring-fuchsia-400/30',
    text: 'text-fuchsia-600 dark:text-fuchsia-300',
  },
  rose: {
    dot: 'bg-rose-500',
    bar: 'bg-rose-500',
    ring: 'ring-rose-400/30',
    text: 'text-rose-600 dark:text-rose-300',
  },
};

export const monthsBetween = (start: Date, end: Date) => {
  return (
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth()) +
    1
  );
};

export const formatDuration = (months: number) => {
  const years = Math.floor(months / 12);
  const remMonths = months % 12;
  if (years && remMonths) return `${years}y ${remMonths}m`;
  if (years) return `${years}y`;
  return `${remMonths}m`;
};

export const formatRange = (start: Date, end?: Date, current?: boolean) => {
  const opts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };
  const s = new Intl.DateTimeFormat('en-US', opts).format(start);
  const e = current
    ? 'Present'
    : end
    ? new Intl.DateTimeFormat('en-US', opts).format(end)
    : 'NA';
  return `${s} — ${e}`;
};

const ExperienceSection = () => {
  const now = useMemo(() => new Date(), []);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0..1 over the timeline area

  // Decorated roles
  const roles = useMemo(
    () =>
      EXPERIENCES.map((e) => {
        const end = e.endDate ?? now;
        const months = monthsBetween(e.startDate, end);
        return { ...e, end, months };
      }),
    [now]
  );

  const longest = useMemo(
    () => Math.max(...roles.map((r) => r.months)),
    [roles]
  );

  // Career span for the mini Gantt
  const careerStart = useMemo(
    () =>
      roles.reduce(
        (min, r) => (r.startDate < min ? r.startDate : min),
        roles[0].startDate
      ),
    [roles]
  );
  const careerEnd = now;
  const careerMonths = monthsBetween(careerStart, careerEnd);

  // Scroll-linked progress for the vertical rail
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      // start filling when section top hits 75% of viewport, full when its bottom hits 25%
      const total = rect.height + viewportH * 0.5;
      const passed = viewportH * 0.75 - rect.top;
      const p = Math.max(0, Math.min(1, passed / total));
      setProgress(p);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <Container className="relative overflow-hidden">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 dark:opacity-70">
        <div className="absolute left-[-12%] top-1/3 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.14),rgba(16,185,129,0))] blur-3xl" />
        <div className="absolute right-[-10%] top-8 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.18),rgba(99,102,241,0))] blur-3xl" />
      </div>

      {/* Header */}
      <div className="flex flex-col items-center gap-4 text-gray-900 dark:text-white">
        <div className="self-center">
          <Tag label="Experience" />
        </div>
        <Typography variant="subtitle" className="max-w-2xl text-center">
          Recent roles where I shipped, led, and scaled teams.
        </Typography>
      </div>

      {/* Mini Gantt: career at a glance */}
      <CareerGantt
        roles={roles}
        careerStart={careerStart}
        careerEnd={careerEnd}
        careerMonths={careerMonths}
      />

      {/* Vertical journey rail */}
      <div ref={sectionRef} className="relative mx-auto mt-16 max-w-5xl">
        {/* Rail track */}
        <div className="absolute bottom-0 left-[19px] top-2 w-px bg-gradient-to-b from-slate-200 via-slate-200 to-transparent dark:from-white/15 dark:via-white/10 md:left-1/2 md:-translate-x-px" />
        {/* Filled progress */}
        <div
          className="absolute left-[19px] top-2 w-px bg-gradient-to-b from-sky-400 via-indigo-500 to-fuchsia-500 transition-[height] duration-150 md:left-1/2 md:-translate-x-px"
          style={{ height: `${progress * 100}%` }}
        />

        <ul className="flex flex-col gap-16 md:gap-24">
          {roles.map((r, i) => (
            <ExperienceMilestone
              key={i}
              index={i}
              role={r}
              longestMonths={longest}
              accentStyles={ACCENT_STYLES[r.accent ?? 'indigo']}
            />
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default ExperienceSection;

/* ================================================================== */
/*  Mini Gantt strip                                                    */
/* ================================================================== */

type RoleRow = ExperienceDetailsType & { end: Date; months: number };

const CareerGantt = ({
  roles,
  careerStart,
  careerEnd,
  careerMonths,
}: {
  roles: RoleRow[];
  careerStart: Date;
  careerEnd: Date;
  careerMonths: number;
}) => {
  const [hover, setHover] = useState<number | null>(null);

  // Build year ticks
  const years = useMemo(() => {
    const out: number[] = [];
    for (
      let y = careerStart.getFullYear();
      y <= careerEnd.getFullYear();
      y++
    ) {
      out.push(y);
    }
    return out;
  }, [careerStart, careerEnd]);

  const segments = useMemo(
    () =>
      // newest is first in source; reverse so timeline reads left-to-right (oldest -> newest)
      [...roles].reverse().map((r, idx) => {
        const offsetMonths = monthsBetween(careerStart, r.startDate) - 1;
        const left = (offsetMonths / careerMonths) * 100;
        const width = Math.max(2, (r.months / careerMonths) * 100);
        return { ...r, left, width, originalIndex: roles.length - 1 - idx };
      }),
    [roles, careerStart, careerMonths]
  );

  return (
    <div className="mx-auto mt-8 w-full max-w-5xl rounded-2xl border border-slate-200/70 bg-white/70 p-5 backdrop-blur dark:border-white/10 dark:bg-white/[0.03] sm:p-7">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[11px] uppercase tracking-wider text-slate-500 dark:text-white/60">
        <span>Career at a glance</span>
        <span>
          {careerStart.getFullYear()} — Present · {formatDuration(careerMonths)}
        </span>
      </div>

      {/* Track */}
      <div className="relative h-20 px-4">
        {/* Year ticks (above the bar) */}
        {years.map((y) => {
          const left =
            (monthsBetween(careerStart, new Date(y, 0)) / careerMonths) * 100;
          return (
            <div
              key={`tick-${y}`}
              className="absolute top-0 -translate-x-1/2"
              style={{ left: `${Math.max(0, Math.min(100, left))}%` }}
            >
              <div className="h-3 w-px bg-slate-300/70 dark:bg-white/15" />
            </div>
          );
        })}

        {/* Bar background */}
        <div className="absolute left-4 right-4 top-6 h-3.5 rounded-md bg-slate-100 dark:bg-white/5" />

        {/* Segments */}
        {segments.map((s, i) => {
          const accent = ACCENT_STYLES[s.accent ?? 'indigo'];
          const isHover = hover === i;
          return (
            <div
              key={i}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className="absolute top-6 cursor-pointer"
              style={{ left: `${s.left}%`, width: `${s.width}%` }}
            >
              <div
                className={mergeClasses(
                  'h-3.5 rounded-md transition-all',
                  accent.bar,
                  isHover ? 'scale-y-150 opacity-100 shadow-md' : 'opacity-90'
                )}
              />
              {isHover && (
                <div className="pointer-events-none absolute left-1/2 top-7 z-20 -translate-x-1/2 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg dark:border-white/10 dark:bg-slate-900">
                  <div className="font-semibold text-slate-800 dark:text-white">
                    {s.company ?? s.logoAlt}
                  </div>
                  <div className="text-slate-500 dark:text-white/70">
                    {s.position}
                  </div>
                  <div className="mt-0.5 text-[10px] text-slate-400 dark:text-white/50">
                    {formatRange(s.startDate, s.endDate, s.currentlyWorkHere)}{' · '}
                    {formatDuration(s.months)}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Year labels (below the bar) */}
        {years.map((y) => {
          const left =
            (monthsBetween(careerStart, new Date(y, 0)) / careerMonths) * 100;
          return (
            <span
              key={`label-${y}`}
              className="absolute top-12 -translate-x-1/2 text-[11px] font-medium text-slate-500 dark:text-white/55"
              style={{ left: `${Math.max(0, Math.min(100, left))}%` }}
            >
              {y}
            </span>
          );
        })}
      </div>
    </div>
  );
};
