import { Testimonial } from '@/types';
import { Quote } from 'lucide-react';
import Image from 'next/image';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-primary-100">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="font-semibold text-navy-900">{testimonial.name}</h4>
            <p className="text-sm text-slate-500">
              {testimonial.role} @ {testimonial.company || testimonial.location}
            </p>
          </div>
        </div>
        <Quote className="h-8 w-8 text-primary-200/50 rotate-180" />
      </div>

      <blockquote className="text-slate-600 leading-relaxed italic">
        "{testimonial.content}"
      </blockquote>
    </div>
  );
}
