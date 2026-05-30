import {
  Compass,
  Hammer,
  Rocket,
  LineChart,
  Users,
  Sparkles,
} from 'lucide-react';

import Typography from '@/components/general/typography';
import Container from '@/components/layout/container';
import Reveal from '@/components/general/reveal';
import Tag from '@/components/data-display/tag';
import { mergeClasses } from '@/lib/utils';

type Practice = {
  step: string;
  title: string;
  pitch: string;
  bullets: string[];
  proof: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: {
    text: string;
    dot: string;
    border: string;
    glow: string;
    chip: string;
  };
};

const PRACTICES: Practice[] = [
  {
    step: '01',
    title: 'Listen before I code',
    pitch:
      "I start with the user's actual problem, not the ticket. A 30-minute conversation with PMs, designers, and end-users saves weeks of building the wrong thing.",
    bullets: [
      'Shadow real users on Zoom or in person',
      'Map the painful path, not the happy one',
      'Write a 1-pager before opening the IDE',
    ],
    proof:
      'Recorded 8 user sessions before sprint planning — half the backlog got deleted, the other half got sharper.',
    icon: Compass,
    accent: {
      text: 'text-sky-600 dark:text-sky-300',
      dot: 'bg-sky-500',
      border: 'border-sky-500',
      glow: 'bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),rgba(56,189,248,0)_65%)]',
      chip: 'ring-sky-200/60 dark:ring-sky-400/20',
    },
  },
  {
    step: '02',
    title: 'Design the system, not the screen',
    pitch:
      'Every feature is a future maintenance bill. I architect for the engineer who reads this code six months from now — usually me, half-asleep.',
    bullets: [
      'Feature-sliced folders + typed contracts',
      'Boring patterns over clever abstractions',
      'Design tokens, not magic numbers',
    ],
    proof:
      'Cut bug-fix turnaround from 3 days to 4 hours by reshaping the state layer.',
    icon: Hammer,
    accent: {
      text: 'text-indigo-600 dark:text-indigo-300',
      dot: 'bg-indigo-500',
      border: 'border-indigo-500',
      glow: 'bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.18),rgba(99,102,241,0)_65%)]',
      chip: 'ring-indigo-200/60 dark:ring-indigo-400/20',
    },
  },
  {
    step: '03',
    title: 'Ship in slices, not slabs',
    pitch:
      "Small PRs, behind feature flags, with previews on every push. The faster code reaches a real device, the faster I learn what's actually broken.",
    bullets: [
      'PRs under 400 lines, reviewed same day',
      'Feature flags + canary rollouts',
      'Preview builds before the first comment',
    ],
    proof:
      'Trunk-based + flags let 4 devs ship in parallel without a single merge conflict war.',
    icon: Rocket,
    accent: {
      text: 'text-fuchsia-600 dark:text-fuchsia-300',
      dot: 'bg-fuchsia-500',
      border: 'border-fuchsia-500',
      glow: 'bg-[radial-gradient(circle_at_top_left,rgba(217,70,239,0.16),rgba(217,70,239,0)_65%)]',
      chip: 'ring-fuchsia-200/60 dark:ring-fuchsia-400/20',
    },
  },
  {
    step: '04',
    title: 'Measure what users feel',
    pitch:
      'Performance is a feature. If a screen takes 4 seconds, no one cares about your animations. I budget for speed and instrument what matters.',
    bullets: [
      'Startup, TTI, and frame budgets per screen',
      'Sentry + RUM, with alerts that wake me',
      'Funnel analytics tied to release tags',
    ],
    proof:
      'Cold start on a 600-screen RN app: 3.8s → 1.4s by trimming JS bridge work.',
    icon: LineChart,
    accent: {
      text: 'text-emerald-600 dark:text-emerald-300',
      dot: 'bg-emerald-500',
      border: 'border-emerald-500',
      glow: 'bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.16),rgba(16,185,129,0)_65%)]',
      chip: 'ring-emerald-200/60 dark:ring-emerald-400/20',
    },
  },
  {
    step: '05',
    title: 'Make the team faster',
    pitch:
      "The best engineers I've worked with multiply everyone around them. I write the docs, templates, and runbooks I wish I had on day one.",
    bullets: [
      'Onboarding new devs in days, not weeks',
      'Reusable scaffolds + ADRs for hard choices',
      'Code reviews that teach, not gatekeep',
    ],
    proof:
      'Wrote the RN onboarding playbook now used by all new mobile hires at MetricStream.',
    icon: Users,
    accent: {
      text: 'text-amber-600 dark:text-amber-300',
      dot: 'bg-amber-500',
      border: 'border-amber-500',
      glow: 'bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.16),rgba(245,158,11,0)_65%)]',
      chip: 'ring-amber-200/60 dark:ring-amber-400/20',
    },
  },
  {
    step: '06',
    title: 'Stay curious, stay humble',
    pitch:
      'The stack I love today will be legacy in five years. I read, prototype, and break things weekly — and I\'m always the first to say "I don\'t know yet."',
    bullets: [
      'Weekly side experiments (this site is one)',
      'Reading list: 1 paper, 1 blog, 1 codebase',
      'Async-friendly: timezones and parents welcome',
    ],
    proof:
      'Rebuilt this portfolio 3 times in 2 years — each rewrite taught me something I now ship at work.',
    icon: Sparkles,
    accent: {
      text: 'text-rose-600 dark:text-rose-300',
      dot: 'bg-rose-500',
      border: 'border-rose-500',
      glow: 'bg-[radial-gradient(circle_at_bottom_right,rgba(244,63,94,0.16),rgba(244,63,94,0)_65%)]',
      chip: 'ring-rose-200/60 dark:ring-rose-400/20',
    },
  },
];

const HowIWorkSection = () => {
  return (
    <Container id="how-i-work" className="relative overflow-hidden">
      {/* Background glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
      >
        <div className="absolute left-[-10%] top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.14),rgba(99,102,241,0))] blur-3xl" />
        <div className="absolute right-[-10%] bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.14),rgba(56,189,248,0))] blur-3xl" />
      </div>

      <div className="flex flex-col items-center gap-4 text-center text-gray-900 dark:text-white">
        <Tag label="How I work" />
        <Typography variant="subtitle" className="max-w-3xl">
          Six habits I bring to every team, every codebase, every sprint.
        </Typography>
        <Typography className="max-w-2xl text-gray-600 dark:text-white/65">
          Not buzzwords — the messy, opinionated things that actually decide
          whether a product ships well.
        </Typography>
      </div>

      <div className="glass-stage mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {PRACTICES.map((p, index) => {
          const Icon = p.icon;
          return (
            <Reveal key={p.step} delay={80 * (index + 1)}>
              <article className="group glass-surface glass-3d relative h-full rounded-2xl p-6">
                {/* accent glow */}
                <div
                  aria-hidden
                  className={mergeClasses(
                    'pointer-events-none absolute inset-0 -z-10 opacity-90',
                    p.accent.glow
                  )}
                />

                {/* Step + Icon */}
                <div className="flex items-center justify-between">
                  <span
                    className={mergeClasses(
                      'text-[11px] font-semibold uppercase tracking-[0.18em]',
                      p.accent.text
                    )}
                  >
                    {p.step}
                  </span>
                  <div
                    className={mergeClasses(
                      'flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm ring-1 transition group-hover:scale-110 dark:bg-white/[0.06]',
                      p.accent.chip
                    )}
                  >
                    <Icon className={mergeClasses('h-5 w-5', p.accent.text)} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="mt-5 text-lg font-semibold leading-tight text-gray-900 dark:text-white sm:text-xl">
                  {p.title}
                </h3>

                {/* Pitch */}
                <p className="mt-2 text-[14px] leading-relaxed text-gray-700 dark:text-white/80">
                  {p.pitch}
                </p>

                {/* Bullets */}
                <ul className="mt-4 flex flex-col gap-1.5 text-[13px] text-gray-600 dark:text-white/70">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span
                        className={mergeClasses(
                          'mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full',
                          p.accent.dot
                        )}
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Proof */}
                <div
                  className={mergeClasses(
                    'mt-5 rounded-lg border-l-2 bg-slate-50/70 px-3 py-2 text-[12px] italic text-slate-600 dark:bg-white/[0.04] dark:text-white/70',
                    p.accent.border
                  )}
                >
                  {p.proof}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Container>
  );
};

export default HowIWorkSection;
