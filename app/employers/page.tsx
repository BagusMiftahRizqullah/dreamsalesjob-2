import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, UserCheck, TrendingUp, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'For Employers | Dream Sales Jobs',
  description: 'Hire top-tier sales talent from Australia, UK, and New Zealand for your business in Southeast Asia.',
};

export default function EmployersPage() {
  const features = [
    {
      title: 'Pre-Vetted Talent',
      description: 'We screen hundreds of applicants. You only see the top 5% of sales professionals.',
      icon: <UserCheck className="h-6 w-6 text-primary-500" />,
    },
    {
      title: 'English Native Speakers',
      description: 'Specializing in Australian, British, and Kiwi candidates with perfect communication skills.',
      icon: <Users className="h-6 w-6 text-primary-500" />,
    },
    {
      title: 'High Retention',
      description: 'Candidates are relocating for a lifestyle change, leading to longer tenure and commitment.',
      icon: <CheckCircle2 className="h-6 w-6 text-primary-500" />,
    },
    {
      title: 'Performance Driven',
      description: 'Our candidates are hungry, experienced closers ready to hit the ground running.',
      icon: <TrendingUp className="h-6 w-6 text-primary-500" />,
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
              Build Your <span className="text-secondary-400">Dream Sales Team</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
              Access a curated pool of high-performing sales professionals from Australia, the UK, and New Zealand ready to relocate to Asia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/hire">
                <Button size="lg" className="bg-secondary-500 hover:bg-secondary-600 text-white font-bold w-full sm:w-auto">
                  Start Hiring
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 w-full sm:w-auto">
                  Contact Us
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

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
                Why Hire Through Us?
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Stop wasting time on unqualified leads. We deliver candidates who close.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="bg-primary-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 bg-slate-100 rounded-2xl p-8 h-full min-h-[400px] flex items-center justify-center">
                 <div className="text-center">
                    <p className="text-slate-400 italic">"Image placeholder: Professional office setting in Asia"</p>
                 </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">
                  Simple Hiring Process
                </h2>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-navy-900 text-white flex items-center justify-center font-bold">1</div>
                    <div>
                      <h3 className="text-xl font-semibold text-navy-900 mb-2">Submit Your Requirements</h3>
                      <p className="text-slate-600">Tell us about your open roles, company culture, and ideal candidate profile.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-navy-900 text-white flex items-center justify-center font-bold">2</div>
                    <div>
                      <h3 className="text-xl font-semibold text-navy-900 mb-2">We Source & Screen</h3>
                      <p className="text-slate-600">Our team taps into our network of active job seekers and passive candidates.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-navy-900 text-white flex items-center justify-center font-bold">3</div>
                    <div>
                      <h3 className="text-xl font-semibold text-navy-900 mb-2">Interview Top Candidates</h3>
                      <p className="text-slate-600">Meet pre-vetted professionals who are ready to move and motivated to sell.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-navy-900 text-white flex items-center justify-center font-bold">4</div>
                    <div>
                      <h3 className="text-xl font-semibold text-navy-900 mb-2">Hire & Scale</h3>
                      <p className="text-slate-600">Onboard your new team members and watch your revenue grow.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary-50">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">
              Find Your Next Top Performer
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
              Get in touch with our recruitment team today to discuss your hiring needs.
            </p>
            <Link href="/hire">
              <Button size="lg" className="bg-secondary-500 hover:bg-secondary-600 text-white font-bold px-8">
                Request a Call Back
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
