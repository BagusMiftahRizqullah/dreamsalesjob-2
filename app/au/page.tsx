import { LandingPage } from '@/components/home/landing-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sales Jobs in Southeast Asia for Australians | Dream Sales Jobs',
  description: 'Find high-paying sales roles in Bali, Thailand & Vietnam. Designed for Australians looking to relocate.',
};

export default function AuPage() {
  return (
    <LandingPage
      heroTitle={
        <>
          High-Ticket Sales Jobs for <span className="text-primary-600">Australians</span>
        </>
      }
      heroSubtitle="Escape the rising cost of living in Australia. Earn AUD in Bali, Thailand & Vietnam with full relocation support and tax-free earning potential."
    />
  );
}
