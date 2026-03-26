import connectDB from '@/lib/mongodb';
import Job from '@/lib/models/Job';
import DestinationModel from '@/lib/models/Destination';
import { JobsClient } from '@/components/admin/JobsClient';

export const metadata = {
  title: 'Jobs | CMS Admin',
};

async function getJobs() {
  await connectDB();
  const jobs = await Job.find().sort({ createdAt: -1 }).lean();
  
  // Serialize data to pass to Client Component safely
  return jobs.map(job => ({
    ...job,
    _id: job._id.toString(),
    createdAt: (job as any).createdAt?.toISOString(),
    updatedAt: (job as any).updatedAt?.toISOString(),
    postedDate: (job as any).postedDate?.toISOString(),
  }));
}

async function getDestinations() {
  await connectDB();
  const destinations = await DestinationModel.find({ isActive: true }).sort({ name: 1 }).lean();
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
