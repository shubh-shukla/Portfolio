'use client';

import Image from 'next/image';

import { TECHNOLOGY_GROUPS } from '@/lib/data';
import Tag from '@/components/data-display/tag';
import Typography from '@/components/general/typography';
import Container from '@/components/layout/container';
import Reveal from '@/components/general/reveal';
import Link from '@/components/navigation/link';

const SkillsSection = () => {
  return (
    <Container id="skills" className="relative overflow-hidden">
      {/* Background glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
      >
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.14),rgba(56,189,248,0))] blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.14),rgba(168,85,247,0))] blur-3xl" />
      </div>

      <div className="flex flex-col items-center gap-4 text-center text-gray-900 dark:text-white">
        <Tag label="Skills" />
        <Typography variant="subtitle" className="max-w-3xl">
          A frontend-heavy full stack toolbox
        </Typography>
        <Typography className="max-w-2xl text-gray-600 dark:text-white/65">
          React, React Native, and Next.js sit at the core — with tooling, mobile platforms,
          and Node-backed services in support.
        </Typography>
      </div>

      <div className="mt-12 flex flex-col gap-10">
        {TECHNOLOGY_GROUPS.map((group, groupIndex) => (
          <Reveal key={group.title} delay={80 * (groupIndex + 1)}>
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-8">
              <div className="md:w-44 md:shrink-0 md:pt-1">
                <div className="flex items-center gap-3">
                  <span className="h-px w-6 bg-gradient-to-r from-sky-400 to-fuchsia-400" />
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-700 dark:text-white/70">
                    {group.title}
                  </h3>
                </div>
              </div>

              <ul className="flex flex-1 flex-wrap gap-2.5">
                {group.items.map((tech) => (
                  <li key={tech.label}>
                    <Link noCustomization href={tech.url} externalLink>
                      <div className="group flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 py-1.5 pl-1.5 pr-3.5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-white/25 dark:hover:bg-white/[0.07]">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-inner ring-1 ring-slate-200/60 dark:bg-white/[0.06] dark:ring-white/10">
                          <Image
                            src={tech.logo}
                            alt={tech.label}
                            width={18}
                            height={18}
                            className="h-[18px] w-[18px] object-contain transition-transform duration-300 group-hover:scale-110 dark:hidden"
                          />
                          <Image
                            src={tech.darkModeLogo ?? tech.logo}
                            alt={tech.label}
                            width={18}
                            height={18}
                            className="hidden h-[18px] w-[18px] object-contain transition-transform duration-300 group-hover:scale-110 dark:block"
                          />
                        </span>
                        <span className="text-[13px] font-medium text-gray-800 dark:text-white/85">
                          {tech.label}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Container>
  );
};

export default SkillsSection;
