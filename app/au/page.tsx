import { LandingPage } from '@/components/home/landing-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sales Jobs in Southeast Asia for Australians | Dream Sales Jobs',
  description: 'Find high-paying sales roles in Bali, Thailand & Vietnam. Designed for Australians looking to relocate.',
};

export const revalidate = 60;

export default async function AuPage() {
  return (
    <LandingPage
      heroTitle={
        <>
          High-Ticket Sales Jobs for <span className="text-primary-600">Australians</span>
        </>
      }
      heroSubtitle="Escape the high cost of living. Use your sales skills to earn AU$15k+ per month while living in Bali, Vietnam, or Thailand."
    />
  );
}
