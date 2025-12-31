import { TECHNOLOGIES } from '@/lib/data';
import Tag from '@/components/data-display/tag';
import TechDetails from '@/components/data-display/tech-details';
import Typography from '@/components/general/typography';
import Container from '@/components/layout/container';

const SkillsSection = () => {
  return (
    <Container id="skills" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 dark:opacity-70">
        <div className="absolute left-[-5%] top-10 h-52 w-52 rounded-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.16),rgba(14,165,233,0))] blur-3xl" />
        <div className="absolute right-[-8%] bottom-0 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.18),rgba(99,102,241,0))] blur-3xl" />
      </div>

      <div className="flex flex-col items-center gap-4 text-gray-900 dark:text-white">
        <div className="self-center">
          <Tag label="Skills" />
        </div>
        <Typography variant="subtitle" className="max-w-2xl text-center">
          A toolbox built around reliable delivery: shipping mobile, web, and platform features with speed and polish.
        </Typography>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {TECHNOLOGIES.map((technology, index) => (
          <TechDetails {...technology} key={index} />
        ))}
      </div>
    </Container>
  );
};

export default SkillsSection;
