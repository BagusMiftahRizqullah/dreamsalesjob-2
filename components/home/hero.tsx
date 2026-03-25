import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText } from 'lucide-react';
import Image from 'next/image';

interface HeroProps {
  title?: React.ReactNode;
  subtitle?: string;
  ctaText?: string;
}

export function Hero({ 
  title = (
    <>
    High-Ticket Sales Jobs In <span className="text-primary-600">Bali & Da Nang, Vietnam</span>
    </>
  ),
  subtitle = "Specialist recruitment for Australians, New Zealanders, & British looking to trade the 9-5 for luxury resort careers or remote work worldwide.",
  ctaText = "Browse Jobs"
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-slate-50 min-h-[calc(100vh-5rem)] flex items-center py-12 lg:py-0">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      
      <div className="container relative">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <h1 className="text-navy-900">
              {title}
            </h1>
            <h2 className="mx-auto lg:mx-0 max-w-2xl text-lg text-slate-600 sm:text-xl leading-relaxed">
              {subtitle}
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href="/jobs" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-navy-900 hover:bg-navy-800 text-white font-bold text-lg h-14 px-8 shadow-xl shadow-navy-900/10">
                  {ctaText} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/apply" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-slate-300 text-slate-700 hover:bg-white hover:text-primary-600 font-semibold text-lg h-14 px-8">
                  Submit CV (2 mins) <FileText className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full ring-2 ring-white bg-slate-200 overflow-hidden relative">
                    <Image
                      src={`https://i.pravatar.cc/150?img=${i + 10}`}
                      alt="User"
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <p>Trusted by 500+ candidates this month</p>
            </div>
          </div>

          <div className="flex-1 relative w-full max-w-lg lg:max-w-xl">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
               <Image
                 src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1974&auto=format&fit=crop"
                 alt="Working remotely in paradise"
                 fill
                 sizes="(max-width: 768px) 100vw, 50vw"
                 className="object-cover"
                 priority
               />
               <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent" />
               <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                 <div className="flex items-center gap-4">
                   <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                     <span className="font-bold text-lg">$</span>
                   </div>
                   <div>
                     <p className="font-bold text-navy-900">Average Placement Value</p>
                     <p className="text-sm text-slate-500">$120k OTE + Relocation</p>
                   </div>
                 </div>
               </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 h-24 w-24 bg-secondary-500/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 h-32 w-32 bg-primary-500/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
