import { getJobsFromDB } from '@/lib/api';
import { JobsList } from '@/components/jobs/jobs-list';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'All Sales Jobs | Dream Sales Jobs',
  description: 'Browse the latest high-ticket sales roles in Bali, Thailand, Vietnam and Remote.',
};

export const revalidate = 60; // Revalidate every minute to show fresh DB data

export default async function JobsPage() {
  const jobs = await getJobsFromDB();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
              Latest Opportunities
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Find your next high-ticket sales role in paradise. Verified employers, transparent earnings.
            </p>
          </div>
          <Suspense fallback={<div>Loading jobs...</div>}>
            <JobsList initialJobs={jobs} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
