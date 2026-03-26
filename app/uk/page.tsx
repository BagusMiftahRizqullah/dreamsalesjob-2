import { LandingPage } from '@/components/home/landing-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sales Jobs in Southeast Asia for Brits | Dream Sales Jobs',
  description: 'Discover high-paying sales roles in Bali, Thailand, and Vietnam. Specially designed for UK citizens seeking an amazing lifestyle and career abroad.',
  alternates: {
    canonical: '/uk',
  },
};

export const dynamic = 'force-dynamic';

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
