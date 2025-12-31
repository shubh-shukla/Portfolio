import { TESTIMONIALS } from '@/lib/data';
import Tag from '@/components/data-display/tag';
import TestimonialDetails from '@/components/data-display/testimonial-details';
import Typography from '@/components/general/typography';
import Container from '@/components/layout/container';

const TestimonialsSection = () => {
  return (
    <Container id="testimonials" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 dark:opacity-80">
        <div className="absolute left-[-6%] top-1/3 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.14),rgba(14,165,233,0))] blur-3xl" />
        <div className="absolute right-[-10%] bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.2),rgba(99,102,241,0))] blur-3xl" />
      </div>

      <div className="flex flex-col items-center gap-4 text-gray-900 dark:text-white">
        <div className="self-center">
          <Tag label="Testimonials" />
        </div>
        <Typography variant="subtitle" className="max-w-2xl text-center">
          Notes from leaders and teammates I’ve shipped with.
        </Typography>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {TESTIMONIALS?.map((testimonial, index) => (
          <TestimonialDetails key={index} {...testimonial} />
        ))}
      </div>
    </Container>
  );
};

export default TestimonialsSection;
