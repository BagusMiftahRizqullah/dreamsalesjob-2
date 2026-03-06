import Link from 'next/link';
import { Job } from '@/types';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, DollarSign, Clock } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-primary-200">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-navy-900 group-hover:text-primary-600 transition-colors">
              <Link href={`/jobs/${job.slug}`}>
                <span className="absolute inset-0" aria-hidden="true" />
                {job.title}
              </Link>
            </h3>
            <p className="text-sm text-slate-500 font-medium">{job.employer.name}</p>
          </div>
          {job.employer.verified && (
             <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
               Verified
             </span>
          )}
        </div>

        <div className="space-y-2 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-slate-400" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-slate-400" />
            <span>
              {job.salary.min === 0 && job.salary.max === 0 ? 'High Commission' : `${formatCurrency(job.salary.min)} - ${formatCurrency(job.salary.max)} / ${job.salary.period}`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-slate-400" />
            <span className="capitalize">{job.type.replace('-', ' ')}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-xs text-slate-400">Posted {new Date(job.postedDate).toLocaleDateString()}</span>
        <Button variant="ghost" size="sm" className="z-10 text-primary-600 hover:text-primary-700 hover:bg-primary-50">
          View Details
        </Button>
      </div>
    </div>
  );
}
