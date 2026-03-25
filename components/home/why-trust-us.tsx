import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export function WhyTrustUs() {
  const points = [
    'No fees for candidates. Ever.',
    'We personally visit every employer office.',
    'Transparent OTE structures before you interview.',
    'Visa and relocation support included.',
    'Network of 5,000+ sales professionals.',
    'Dedicated account manager for every candidate.',
  ];

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <h2 className="text-navy-900">
              Why Top Sales Talent Trusts Us
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We are not a faceless job board. We are a team of ex-sales professionals who have lived and worked in Southeast Asia. We know the difference between a dream job and a nightmare, and we filter accordingly.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {points.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
                  <span className="text-slate-700 font-medium">{point}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 shadow-xl">
             <Image
                src="/images/TrustUs.png"
                alt="Why Trust Dream Sales Jobs"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
             />
          </div>
        </div>
      </div>
    </section>
  );
}
