import Typography from '@/components/general/typography';
import Container from '@/components/layout/container';
import Card from '@/components/layout/card';
import Reveal from '@/components/general/reveal';

const PRACTICES = [
  {
    title: 'Architecture & Patterns',
    summary:
      'Modular, typed frontends with feature slices; clean boundaries between UI, state, and data; API contracts enforced with schemas.',
    items: ['Feature-sliced + design systems', 'Typed API contracts (Zod/OpenAPI)', 'Offline-first & caching strategies'],
  },
  {
    title: 'Tooling & CI/CD',
    summary:
      'Fast feedback loops with lint/test/format in CI, preview builds per PR, and automated release/versioning.',
    items: ['CI: lint + tests + typecheck', 'Preview deploys per PR', 'Automated changelog & versioning'],
  },
  {
    title: 'Observability',
    summary:
      'Ship with visibility: logs, metrics, traces, and UX analytics to catch regressions before users do.',
    items: ['Tracing & metrics (OTEL)', 'Crash/error reporting', 'UX analytics & funnel checks'],
  },
  {
    title: 'Performance & Quality',
    summary:
      'Measure, then optimize: budgets for bundle size and startup, profiling for slow paths, and automated perf gates.',
    items: ['Perf budgets + profiling', 'Bundle/asset audits', 'Synthetic + real-user checks'],
  },
  {
    title: 'Collaboration',
    summary:
      'Clear specs, design/eng pairing, and concise PRs with context so teams ship quickly without surprises.',
    items: ['Small, focused PRs', 'Design/eng pairing', 'Runbooks & onboarding docs'],
  },
];

const HowIWorkSection = () => {
  return (
    <Container id="how-i-work" className="relative overflow-hidden">
      <Reveal className="flex flex-col items-center gap-4 text-gray-900 dark:text-white" delay={50}>
        <Typography variant="subtitle" className="max-w-3xl text-center">
          How I work: architecture, tooling, and quality habits that keep teams shipping calmly.
        </Typography>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {PRACTICES.map((practice, index) => (
          <Reveal key={practice.title} delay={100 * (index + 1)}>
            <Card className="h-full bg-[rgba(255,255,255,0.92)] p-6 dark:bg-[rgba(8,12,24,0.94)]">
              <Typography variant="subtitle" className="font-semibold text-gray-900 dark:text-white">
                {practice.title}
              </Typography>
              <Typography className="mt-2 text-gray-700 dark:text-white/85">{practice.summary}</Typography>
              <ul className="mt-4 flex flex-col gap-2 text-sm text-gray-700 dark:text-white/80">
                {practice.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>
    </Container>
  );
};

export default HowIWorkSection;
