import { LandingPage } from '@/components/home/landing-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sales Jobs in Southeast Asia for Brits | Dream Sales Jobs',
  description: 'Find high-paying sales roles in Bali, Thailand & Vietnam. Designed for UK citizens looking to relocate.',
};

export default function UkPage() {
  return (
    <LandingPage
      heroTitle={
        <>
          High-Ticket Sales Jobs for <span className="text-primary-600">UK Expats</span>
        </>
      }
      heroSubtitle="Escape the grey skies and high taxes. Earn GBP/USD equivalent in Bali, Thailand & Vietnam with full relocation support and sunshine year-round."
    />
  );
}
