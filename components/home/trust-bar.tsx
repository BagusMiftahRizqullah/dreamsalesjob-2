import { ShieldCheck, DollarSign, Globe, Clock } from 'lucide-react';

export function TrustBar() {
  const items = [
    {
      icon: ShieldCheck,
      title: 'Verified Employers',
      description: 'We vet every company for legitimacy and stability.',
    },
    {
      icon: DollarSign,
      title: 'Transparent Earnings',
      description: 'Clear OTE structures, no hidden caps.',
    },
    {
      icon: Globe,
      title: 'Relocation Support',
      description: 'Visa guidance and on-ground assistance.',
    },
    {
      icon: Clock,
      title: 'Fast Feedback',
      description: 'Get a response on your application in 48h.',
    },
  ];

  return (
    <section className="bg-white border-b border-slate-100 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-slate-50 transition-colors">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-600 ring-4 ring-white">
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-navy-900">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-500 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
