import { getAllDestinations } from '@/lib/api';
import { DestinationsGrid } from '@/components/home/destinations-grid';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sales Jobs in Southeast Asia | Dream Sales Jobs',
  description: 'Explore high-paying sales opportunities in Bali, Thailand, and Vietnam. Relocate abroad and live your dream lifestyle while earning top commissions.',
  alternates: {
    canonical: '/destinations',
  },
};

export const revalidate = 60;

export default async function DestinationsPage() {
  const allDestinations = await getAllDestinations();
  const destinations = allDestinations.filter((d) => d.slug !== 'indonesia');

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        <DestinationsGrid 
          destinations={destinations} 
          title="Choose Your Paradise"
          description="We partner with verified employers in the most desirable locations in Southeast Asia. Low cost of living, high earning potential, and an incredible lifestyle await."
        />

        <section className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="max-w-4xl mx-auto prose prose-slate">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">Why Relocate for a Sales Job in Southeast Asia?</h2>
            <p className="text-slate-600 mb-4">
              Moving abroad to pursue high-ticket sales opportunities is more than just a career move; it is a complete lifestyle upgrade. Professionals from Australia, New Zealand, the UK, and beyond are discovering that locations like Bali, Vietnam, and Thailand offer an unparalleled combination of professional growth and personal freedom. The cost of living in these tropical destinations is significantly lower than in major Western cities, allowing your commission earnings to stretch much further.
            </p>
            <p className="text-slate-600 mb-4">
              Whether you are an experienced closer or an ambitious sales representative looking to break into the luxury resort, real estate, or B2B tech markets, our verified employers provide structured training, exceptional uncapped commission structures, and comprehensive relocation assistance. Imagine closing high-value deals in the morning and surfing or enjoying a world-class beach club in the afternoon.
            </p>
            <h3 className="text-xl font-semibold text-navy-900 mb-3">Tailored Support for Your Transition</h3>
            <p className="text-slate-600">
              At Dream Sales Jobs, we understand that relocating to a new country can be daunting. That is why we exclusively partner with trusted companies that assist with visa processing, initial accommodation, and ongoing career development. Browse our destinations above to find the perfect location that matches your career ambitions and lifestyle goals, and take the first step toward working in paradise.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
