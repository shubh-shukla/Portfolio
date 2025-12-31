import { EXPERIENCES } from '@/lib/data';
import ExperienceDetails from '@/components/data-display/experience-details';
import Tag from '@/components/data-display/tag';
import Typography from '@/components/general/typography';
import Container from '@/components/layout/container';

const ExperienceSection = () => {
  return (
    <Container className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 dark:opacity-70">
        <div className="absolute left-[-12%] top-1/3 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.14),rgba(16,185,129,0))] blur-3xl" />
        <div className="absolute right-[-10%] top-8 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.18),rgba(99,102,241,0))] blur-3xl" />
      </div>

      <div className="flex flex-col items-center gap-4 text-gray-900 dark:text-white">
        <div className="self-center">
          <Tag label="Experience" />
        </div>
        <Typography variant="subtitle" className="max-w-2xl text-center">
          Recent roles where I shipped, led, and scaled teams.
        </Typography>
      </div>

      <div className="flex flex-col gap-6">
        {EXPERIENCES?.map((experience, index) => (
          <ExperienceDetails {...experience} key={index} />
        ))}
      </div>
    </Container>
  );
};

export default ExperienceSection;
