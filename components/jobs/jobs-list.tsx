'use client';

import { useState } from 'react';
import { Job } from '@/types';
import { JobFilters } from '@/components/jobs/job-filters';
import { JobCard } from '@/components/jobs/job-card';

interface JobsListProps {
  initialJobs: Job[];
}

export function JobsList({ initialJobs }: JobsListProps) {
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(initialJobs);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <aside className="lg:col-span-1">
        <JobFilters jobs={initialJobs} onFilterChange={setFilteredJobs} />
      </aside>
      <div className="lg:col-span-3 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-navy-900">
            Showing {filteredJobs.length} Jobs
          </h2>
          <div className="text-sm text-slate-500">
            Sorted by Newest
          </div>
        </div>

        {filteredJobs.length > 0 ? (
          <div className="grid gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
            <h3 className="text-lg font-medium text-slate-900">No jobs found</h3>
            <p className="text-slate-500 mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
