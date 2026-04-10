'use client';

import React, { useState } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { createJob, updateJob } from '@/app/admin-dreamsalesjobs/jobs/actions';
import { Button } from '@/components/ui/button';

interface JobFormProps {
  job?: any;
  destinations: { slug: string; name: string }[];
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function JobForm({ job, destinations, onSuccess, onCancel }: JobFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!job;

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        await updateJob(job._id.toString(), formData);
      } else {
        await createJob(formData);
      }
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      alert('An error occurred while saving the job.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-navy-900">
            {isEditing ? 'Edit Job' : 'Create New Job'}
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            {isEditing ? 'Update the details of the job listing.' : 'Fill in the details to publish a new job.'}
          </p>
        </div>
      </div>

      <form action={handleSubmit} className="space-y-6">
        
        {/* Basic Info */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-navy-900 border-b border-slate-100 pb-2">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-slate-700">Job Title *</label>
              <input type="text" id="title" name="title" required defaultValue={job?.title} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all" placeholder="e.g. Senior Sales Executive" />
            </div>

            <div className="space-y-2">
              <label htmlFor="slug" className="block text-sm font-medium text-slate-700">Slug (URL)</label>
              <input type="text" id="slug" name="slug" defaultValue={job?.slug} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all" placeholder="Leave empty to auto-generate" />
            </div>

            <div className="space-y-2">
              <label htmlFor="destination" className="block text-sm font-medium text-slate-700">Destination *</label>
              <select id="destination" name="destination" required defaultValue={job?.destination || ''} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all">
                <option value="" disabled>Select Destination</option>
                {destinations.map((dest) => (
                  <option key={dest.slug} value={dest.slug}>{dest.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="block text-sm font-medium text-slate-700">Exact Location *</label>
              <input type="text" id="location" name="location" required defaultValue={job?.location} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all" placeholder="e.g. Seminyak, Bali" />
            </div>

            <div className="space-y-2">
              <label htmlFor="type" className="block text-sm font-medium text-slate-700">Job Type *</label>
              <select id="type" name="type" required defaultValue={job?.type || 'full-time'} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all">
                <option value="full-time">Full Time</option>
                <option value="contract">Contract</option>
                <option value="part-time">Part Time</option>
              </select>
            </div>

            <div className="space-y-2 flex items-center pt-8">
              <label className="relative flex items-center cursor-pointer">
                <input type="checkbox" id="isActive" name="isActive" defaultChecked={isEditing ? job?.isActive : true} className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                <span className="ml-3 text-sm font-medium text-slate-700">Active (Visible on website)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Salary */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-navy-900 border-b border-slate-100 pb-2">Salary / OTE</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label htmlFor="salary.min" className="block text-sm font-medium text-slate-700">Min Salary</label>
              <input type="number" id="salary.min" name="salary.min" defaultValue={job?.salary?.min || 0} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all" />
            </div>
            <div className="space-y-2">
              <label htmlFor="salary.max" className="block text-sm font-medium text-slate-700">Max Salary</label>
              <input type="number" id="salary.max" name="salary.max" defaultValue={job?.salary?.max || 0} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all" />
            </div>
            <div className="space-y-2">
              <label htmlFor="salary.currency" className="block text-sm font-medium text-slate-700">Currency</label>
              <input type="text" id="salary.currency" name="salary.currency" defaultValue={job?.salary?.currency || 'USD'} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all" />
            </div>
            <div className="space-y-2">
              <label htmlFor="salary.period" className="block text-sm font-medium text-slate-700">Period</label>
              <select id="salary.period" name="salary.period" defaultValue={job?.salary?.period || 'month'} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all">
                <option value="month">Per Month</option>
                <option value="year">Per Year</option>
              </select>
            </div>
          </div>
          <p className="text-sm text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100 mt-4">💡 Tip: Set Min and Max to 0 to display &quot;High Commission&quot; or similar text on frontend.</p>
        </div>

        {/* Employer */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-navy-900 border-b border-slate-100 pb-2">Employer Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="employer.name" className="block text-sm font-medium text-slate-700">Company Name *</label>
              <input type="text" id="employer.name" name="employer.name" required defaultValue={job?.employer?.name} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all" />
            </div>
            <div className="space-y-2 flex items-center pt-8">
              <label className="relative flex items-center cursor-pointer">
                <input type="checkbox" id="employer.verified" name="employer.verified" defaultChecked={job?.employer?.verified} className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                <span className="ml-3 text-sm font-medium text-slate-700">Verified Employer (Blue Badge)</span>
              </label>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="employer.website" className="block text-sm font-medium text-slate-700">Company Website</label>
              <input type="url" id="employer.website" name="employer.website" defaultValue={job?.employer?.website} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-navy-900 border-b border-slate-100 pb-2">Job Description & Details</h2>
          
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-slate-700">Main Description *</label>
            <textarea id="description" name="description" required rows={4} defaultValue={job?.description} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all resize-y" placeholder="Overview of the role..."></textarea>
          </div>

          <div className="space-y-2">
            <label htmlFor="responsibilities" className="block text-sm font-medium text-slate-700">Responsibilities (One per line)</label>
            <textarea id="responsibilities" name="responsibilities" rows={5} defaultValue={job?.responsibilities?.join('\n')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all resize-y" placeholder="- Closing high-ticket sales&#10;- Managing leads..."></textarea>
          </div>

          <div className="space-y-2">
            <label htmlFor="requirements" className="block text-sm font-medium text-slate-700">Requirements (One per line)</label>
            <textarea id="requirements" name="requirements" rows={5} defaultValue={job?.requirements?.join('\n')} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all resize-y" placeholder="- 3+ years B2B sales&#10;- Native English speaker..."></textarea>
          </div>
        </div>

        <div className="pt-4 pb-8 flex justify-end gap-3 sticky bottom-0 bg-slate-50/80 backdrop-blur-sm z-10 px-2">
          <Button type="button" variant="outline" onClick={onCancel} className="bg-white">Cancel</Button>
          <Button type="submit" disabled={isSubmitting} className="gap-2 min-w-[120px]">
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Job
              </>
            )}
          </Button>
        </div>

      </form>
    </div>
  );
}
