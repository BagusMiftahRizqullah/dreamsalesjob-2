'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { Job } from '@/types';

interface JobFiltersProps {
  jobs: Job[];
  onFilterChange: (filteredJobs: Job[]) => void;
}

export function JobFilters({ jobs, onFilterChange }: JobFiltersProps) {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [destination, setDestination] = useState(searchParams.get('destination') || 'all');
  const [type, setType] = useState(searchParams.get('type') || 'all');

  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            job.employer.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDestination = destination === 'all' || job.destination === destination;
      const matchesType = type === 'all' || job.type === type;

      return matchesSearch && matchesDestination && matchesType;
    });

    onFilterChange(filtered);
  }, [searchTerm, destination, type, jobs, onFilterChange]);

  const clearFilters = () => {
    setSearchTerm('');
    setDestination('all');
    setType('all');
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
      <div>
        <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-2">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            id="search"
            placeholder="Job title or company..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="destination" className="block text-sm font-medium text-slate-700 mb-2">Destination</label>
        <select
          id="destination"
          className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        >
          <option value="all">All Destinations</option>
          <option value="salesjobsbali">Bali</option>
          <option value="salesjobsthailand">Thailand</option>
          <option value="salesjobsvietnam">Vietnam</option>
          <option value="remotesalesjobs">Remote</option>
        </select>
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-slate-700 mb-2">Job Type</label>
        <select
          id="type"
          className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="full-time">Full Time</option>
          <option value="contract">Contract</option>
        </select>
      </div>

      <Button variant="outline" onClick={clearFilters} className="w-full">
        Clear Filters <X className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
