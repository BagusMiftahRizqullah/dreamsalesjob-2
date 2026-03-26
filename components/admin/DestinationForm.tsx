'use client';

import { useState } from 'react';
import { createDestination, updateDestination } from '@/app/admin-dreamsalesjobs/destinations/actions';

interface DestinationFormProps {
  destination?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function DestinationForm({ destination, onSuccess, onCancel }: DestinationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!destination;

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        await updateDestination(destination._id.toString(), formData);
      } else {
        await createDestination(formData);
      }
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      alert('An error occurred while saving the destination.');
      setIsSubmitting(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-navy-900">
            {isEditing ? 'Edit Destination' : 'Add New Destination'}
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            {isEditing ? 'Update destination master data.' : 'Create a new destination for jobs.'}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-lg font-semibold text-navy-900 border-b border-slate-100 pb-2">Basic Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-slate-700">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={destination?.name}
              required
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="slug" className="text-sm font-medium text-slate-700">Slug *</label>
            <input
              type="text"
              id="slug"
              name="slug"
              defaultValue={destination?.slug}
              required
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="description" className="text-sm font-medium text-slate-700">Description *</label>
            <textarea
              id="description"
              name="description"
              defaultValue={destination?.description}
              required
              rows={3}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all resize-y"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="image" className="text-sm font-medium text-slate-700">Image Path *</label>
            <input
              type="text"
              id="image"
              name="image"
              defaultValue={destination?.image || '/images/place/default.png'}
              required
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="relative flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="isActive"
                defaultChecked={destination ? destination.isActive : true}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              <span className="ml-3 text-sm font-medium text-slate-700">Is Active</span>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-lg font-semibold text-navy-900 border-b border-slate-100 pb-2">Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label htmlFor="stats.averageEarnings" className="text-sm font-medium text-slate-700">Average Earnings</label>
            <input
              type="text"
              id="stats.averageEarnings"
              name="stats.averageEarnings"
              defaultValue={destination?.stats?.averageEarnings}
              placeholder="e.g., $80k - $150k"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="stats.costOfLiving" className="text-sm font-medium text-slate-700">Cost of Living</label>
            <input
              type="text"
              id="stats.costOfLiving"
              name="stats.costOfLiving"
              defaultValue={destination?.stats?.costOfLiving}
              placeholder="e.g., Low ($2k/mo)"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="stats.visaType" className="text-sm font-medium text-slate-700">Visa Type</label>
            <input
              type="text"
              id="stats.visaType"
              name="stats.visaType"
              defaultValue={destination?.stats?.visaType}
              placeholder="e.g., B211A / KITAS"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="pt-4 pb-8 flex justify-end gap-3 sticky bottom-0 bg-slate-50/80 backdrop-blur-sm z-10 px-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 border border-slate-200 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors font-medium min-w-[140px]"
        >
          {isSubmitting ? 'Saving...' : 'Save Destination'}
        </button>
      </div>
    </form>
  );
}