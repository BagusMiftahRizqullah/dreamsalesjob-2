import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, DollarSign, Globe, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'For Candidates | Dream Sales Jobs',
  description: 'Land your dream sales job in Bali, Thailand, or Vietnam. We help Australians, Kiwis, and Brits find high-ticket roles abroad.',
};

export default function CandidatesPage() {
  const benefits = [
    {
      title: 'Verified Employers',
      description: 'We vet every company to ensure legitimate opportunities and stable contracts.',
      icon: <CheckCircle2 className="h-6 w-6 text-primary-500" />,
    },
    {
      title: 'High Earning Potential',
      description: 'Roles with transparent OTEs ranging from $80k to $200k+ USD.',
      icon: <DollarSign className="h-6 w-6 text-primary-500" />,
    },
    {
      title: 'Relocation Support',
      description: 'Many employers offer visa assistance and relocation packages.',
      icon: <Globe className="h-6 w-6 text-primary-500" />,
    },
    {
      title: 'Career Growth',
      description: 'Work with fast-growing international companies and expand your network.',
      icon: <Briefcase className="h-6 w-6 text-primary-500" />,
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <section className="bg-navy-900 text-white py-20 md:py-32 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Take Your Sales Career <span className="text-secondary-400">Global</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
              Stop dreaming about a better lifestyle. We connect top sales talent with high-growth companies in Southeast Asia's most desirable locations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/jobs">
                <Button size="lg" className="bg-secondary-500 hover:bg-secondary-600 text-white font-bold w-full sm:w-auto">
                  Browse Open Roles
                </Button>
              </Link>
              <Link href="/guides">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 w-full sm:w-auto">
                  Read Our Guides
                </Button>
              </Link>
            </div>
          </div>
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-secondary-500 blur-[100px] rounded-full" />
            <div className="absolute left-0 bottom-0 w-1/3 h-1/3 bg-primary-500 blur-[100px] rounded-full" />
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
                Why Sales Pros Choose Us
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                We're not just a job board. We're your partner in making a life-changing career move.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="bg-primary-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-2">{benefit.title}</h3>
                  <p className="text-slate-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">
                  How It Works
                </h2>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-navy-900 text-white flex items-center justify-center font-bold">1</div>
                    <div>
                      <h3 className="text-xl font-semibold text-navy-900 mb-2">Apply for a Role</h3>
                      <p className="text-slate-600">Browse our curated job board and apply directly. One application puts you in front of our recruitment team.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-navy-900 text-white flex items-center justify-center font-bold">2</div>
                    <div>
                      <h3 className="text-xl font-semibold text-navy-900 mb-2">Initial Screening</h3>
                      <p className="text-slate-600">We'll chat to understand your experience, goals, and ideal destination. No automated rejections.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-navy-900 text-white flex items-center justify-center font-bold">3</div>
                    <div>
                      <h3 className="text-xl font-semibold text-navy-900 mb-2">Employer Interview</h3>
                      <p className="text-slate-600">We introduce you to top employers. You interview directly with decision-makers.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-navy-900 text-white flex items-center justify-center font-bold">4</div>
                    <div>
                      <h3 className="text-xl font-semibold text-navy-900 mb-2">Get Hired & Relocate</h3>
                      <p className="text-slate-600">Secure your offer. We help with advice on visas, flights, and finding your new home.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-100 rounded-2xl p-8 h-full min-h-[400px] flex items-center justify-center">
                 <div className="text-center">
                    <p className="text-slate-400 italic">"Image placeholder: Candidate looking at a view in Bali/Thailand"</p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary-50">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">
              Ready to Upgrade Your Lifestyle?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
              Don't wait for "someday". The best sales roles in Southeast Asia are filling up fast.
            </p>
            <Link href="/jobs">
              <Button size="lg" className="bg-secondary-500 hover:bg-secondary-600 text-white font-bold px-8">
                View All Jobs
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
