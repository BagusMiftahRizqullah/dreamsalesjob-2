import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/home/hero';
import { TrustBar } from '@/components/home/trust-bar';
import { HowItWorks } from '@/components/home/how-it-works';
import { FeaturedJobs } from '@/components/home/featured-jobs';
import { DestinationsGrid } from '@/components/home/destinations-grid';
import { StatsBand } from '@/components/home/stats-band';
import { Testimonials } from '@/components/home/testimonials';
import { WhyTrustUs } from '@/components/home/why-trust-us';
import { CTASection } from '@/components/home/cta-section';
import { getAllJobs, getAllDestinations, getAllTestimonials } from '@/lib/api';

interface LandingPageProps {
  heroTitle?: React.ReactNode;
  heroSubtitle?: string;
}

export function LandingPage({ heroTitle, heroSubtitle }: LandingPageProps) {
  const jobs = getAllJobs();
  const destinations = getAllDestinations();
  const testimonials = getAllTestimonials();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        <Hero title={heroTitle} subtitle={heroSubtitle} />
        <TrustBar />
        <HowItWorks />
        <DestinationsGrid destinations={destinations} />
        <FeaturedJobs jobs={jobs} />
        <StatsBand />
        <Testimonials testimonials={testimonials} />
        <WhyTrustUs />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
