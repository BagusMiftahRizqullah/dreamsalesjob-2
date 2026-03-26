import { LandingPage } from '@/components/home/landing-page';

export const revalidate = 60; // Revalidate to show fresh DB data

export default async function Home() {
  return <LandingPage />;
}
