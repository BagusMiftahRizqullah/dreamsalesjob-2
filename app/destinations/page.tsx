import { getAllDestinations } from '@/lib/api';
import { DestinationsGrid } from '@/components/home/destinations-grid';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sales Jobs in Southeast Asia | Dream Sales Jobs',
  description: 'Explore sales opportunities in Bali, Thailand, and Vietnam. Live the dream life while earning high commissions.',
};

export default function DestinationsPage() {
  const destinations = getAllDestinations();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        <DestinationsGrid 
          destinations={destinations} 
          title="Choose Your Paradise"
          description="We partner with verified employers in the most desirable locations in Southeast Asia. Low cost of living, high earning potential, and an incredible lifestyle await."
        />
      </main>
      <Footer />
    </>
  );
}
