import { LandingPage } from '@/components/home/landing-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sales Jobs in Southeast Asia for Brits | Dream Sales Jobs',
  description: 'Find high-paying sales roles in Bali, Thailand & Vietnam. Designed for UK citizens looking to relocate.',
};

export const revalidate = 60;

export default async function UkPage() {
  return (
    <LandingPage
      heroTitle={
        <>
          High-Ticket Sales Jobs for <span className="text-primary-600">UK Professionals</span>
        </>
      }
      heroSubtitle="Escape the high cost of living. Use your sales skills to earn £8k+ per month while living in Bali, Vietnam, or Thailand."
    />
  );
}
