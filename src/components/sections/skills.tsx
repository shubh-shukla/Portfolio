import { TECHNOLOGIES } from '@/lib/data';
import Tag from '@/components/data-display/tag';
import TechDetails from '@/components/data-display/tech-details';
import Typography from '@/components/general/typography';
import Container from '@/components/layout/container';

const SkillsSection = () => {
  return (
    <Container id="skills" className="relative overflow-hidden">

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
