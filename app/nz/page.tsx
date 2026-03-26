import { LandingPage } from '@/components/home/landing-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sales Jobs in Southeast Asia for Kiwis | Dream Sales Jobs',
  description: 'Discover high-paying sales roles in Bali, Thailand, and Vietnam. Specially designed for New Zealanders seeking an amazing lifestyle and career abroad.',
  alternates: {
    canonical: '/nz',
  },
};

export const dynamic = 'force-dynamic';

export default async function NzPage() {
  return (
    <LandingPage
      heroTitle={
        <>
          High-Ticket Sales Jobs for <span className="text-primary-600">Kiwis</span>
        </>
      }
      heroSubtitle="Escape the rising cost of living in NZ. Earn top dollar in Bali, Thailand & Vietnam with full relocation support and incredible lifestyle."
    />
  );
}
