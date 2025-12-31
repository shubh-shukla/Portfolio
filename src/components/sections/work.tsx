import { PROJECTS } from '@/lib/data';
import ProjectDetails from '@/components/data-display/project-details';
import Tag from '@/components/data-display/tag';
import Typography from '@/components/general/typography';
import Container from '@/components/layout/container';

const WorkSection = () => {
  return (
    <Container id="work" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 dark:opacity-70">
        <div className="absolute left-[-8%] top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.14),rgba(14,165,233,0))] blur-3xl" />
        <div className="absolute right-[-6%] bottom-12 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.2),rgba(99,102,241,0))] blur-3xl" />
      </div>

      <div className="flex flex-col items-center gap-4 text-gray-900 dark:text-white">
        <div className="self-center">
          <Tag label="Work" />
        </div>
        <Typography variant="subtitle" className="max-w-2xl text-center">
          Noteworthy builds shipped across mobile and web.
        </Typography>
      </div>

      <div className="flex flex-col gap-8">
        {PROJECTS?.map((project, index) => (
          <ProjectDetails
            key={index}
            {...project}
            layoutType={index % 2 === 0 ? 'default' : 'reverse'}
          />
        ))}
      </div>
    </Container>
  );
};

export default WorkSection;
