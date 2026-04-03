import prisma from '@/lib/prisma';
import { JobsClient } from '@/components/admin/JobsClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Jobs | CMS Admin',
};

async function getJobs() {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: 'desc' }
  });
  
  // Serialize data to pass to Client Component safely
  return jobs.map(job => ({
    ...job,
    _id: job.id,
    createdAt: job.createdAt?.toISOString(),
    updatedAt: job.updatedAt?.toISOString(),
    postedDate: job.postedDate?.toISOString(),
  }));
}

async function getDestinations() {
  const destinations = await prisma.destination.findMany({
    where: { isActive: true },
    orderBy: { name: 'asc' }
  });
  return destinations.map(dest => ({
    slug: dest.slug,
    name: dest.name,
  }));
}

export default async function JobsPage() {
  const jobs = await getJobs();
  const destinations = await getDestinations();
  return <JobsClient jobs={jobs} destinations={destinations} />;
}
