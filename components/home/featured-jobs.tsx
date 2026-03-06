import Link from 'next/link';
import { Job } from '@/types';
import { JobCard } from '@/components/jobs/job-card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface FeaturedJobsProps {
  jobs: Job[];
}

export function FeaturedJobs({ jobs }: FeaturedJobsProps) {
  return (
    <section className="bg-slate-50 py-8 lg:py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <h2 className="text-navy-900">
              Featured Opportunities
            </h2>
            <p className="mt-4 text-slate-600">
              Hand-picked roles with verified employers and competitive OTEs.
            </p>
          </div>
          <Link href="/jobs" className="hidden md:block">
            <Button variant="ghost" className="text-primary-600 hover:text-primary-700 hover:bg-primary-50">
              View All Jobs <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.slice(0, 3).map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link href="/jobs">
            <Button size="lg" className="w-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50">
              View All Jobs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
