import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="bg-navy-900 py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="container relative text-center">
        <h2 className="text-white mb-6">
          Ready to Upgrade Your Lifestyle?
        </h2>
        <p className="mx-auto max-w-2xl text-slate-300 mb-10 leading-relaxed">
          Stop dreaming about it. Start your application today and be on a plane within 30 days. Our employers are hiring now.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/jobs" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto bg-secondary-500 hover:bg-secondary-600 text-white font-bold text-lg h-14 px-8 shadow-lg shadow-secondary-500/20">
              Browse All Jobs <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/contact" className="w-full sm:w-auto">
             <Button variant="outline" size="lg" className="w-full sm:w-auto border-slate-700 text-slate-300 hover:bg-white/10 hover:text-white font-semibold text-lg h-14 px-8">
               Talk to a Recruiter
             </Button>
          </Link>
        </div>
        <p className="mt-6 text-sm text-slate-500">
          No hidden fees. 100% free for candidates.
        </p>
      </div>
    </section>
  );
}
