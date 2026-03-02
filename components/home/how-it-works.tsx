import { FileCheck, UserCheck, PhoneCall, Plane } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: 'Apply',
      description: 'Submit your CV for a specific role or general consideration.',
      icon: FileCheck,
    },
    {
      id: 2,
      title: 'Screen',
      description: 'Our team reviews your profile and schedules a discovery call.',
      icon: UserCheck,
    },
    {
      id: 3,
      title: 'Interview',
      description: 'Meet directly with the employer via Zoom or in-person.',
      icon: PhoneCall,
    },
    {
      id: 4,
      title: 'Offer & Onboard',
      description: 'Negotiate your package and start your relocation journey.',
      icon: Plane,
    },
  ];

  return (
    <section className="bg-slate-50 py-20 lg:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
            Your Path to Paradise
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            A simple, transparent process designed to get you hired and settled quickly.
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-slate-200 -z-10 transform -translate-y-1/2" />

          {steps.map((step) => (
            <div key={step.id} className="relative flex flex-col items-center text-center group">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white border-4 border-slate-100 shadow-sm text-primary-600 transition-transform group-hover:scale-110 group-hover:border-primary-100 z-10 mb-6">
                <step.icon className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-2">{step.title}</h3>
              <p className="text-slate-500 leading-relaxed max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
