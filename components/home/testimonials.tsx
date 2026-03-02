import { Testimonial } from '@/types';
import { TestimonialCard } from '@/components/shared/testimonial-card';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="bg-slate-50 py-20 lg:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
            Success Stories
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Hear from candidates who made the move and employers who hired them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
