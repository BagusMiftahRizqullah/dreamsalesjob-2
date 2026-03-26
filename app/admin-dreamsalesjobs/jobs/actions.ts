'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/mongodb';
import Job from '@/lib/models/Job';
import { redirect } from 'next/navigation';

// Create a new job
export async function createJob(formData: FormData) {
  await connectDB();

  // Convert FormData to object and handle arrays properly
  const rawData = Object.fromEntries(formData.entries());
  
  // Basic slug generation from title if not provided
  let slug = rawData.slug as string;
  if (!slug) {
    slug = (rawData.title as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }

  const jobData = {
    title: rawData.title,
    slug,
    destination: rawData.destination,
    type: rawData.type,
    location: rawData.location,
    description: rawData.description,
    industry: rawData.industry,
    seniority: rawData.seniority,
    isActive: rawData.isActive === 'on',
    
    // Parse nested objects
    salary: {
      min: Number(rawData['salary.min']) || 0,
      max: Number(rawData['salary.max']) || 0,
      currency: rawData['salary.currency'] || 'USD',
      period: rawData['salary.period'] || 'month',
    },
    
    employer: {
      name: rawData['employer.name'],
      logo: rawData['employer.logo'] || '',
      verified: rawData['employer.verified'] === 'on',
      description: rawData['employer.description'] || '',
      website: rawData['employer.website'] || '',
    },

    // Handle multiline text areas as arrays for requirements and responsibilities
    requirements: (rawData.requirements as string)
      ?.split('\n')
      .map(r => r.trim())
      .filter(r => r.length > 0) || [],
      
    responsibilities: (rawData.responsibilities as string)
      ?.split('\n')
      .map(r => r.trim())
      .filter(r => r.length > 0) || [],
  };

  try {
    const newJob = new Job(jobData);
    await newJob.save();
    revalidatePath('/admin-dreamsalesjobs/jobs');
    return { success: true };
  } catch (error) {
    console.error('Failed to create job:', error);
    throw new Error('Failed to create job');
  }
}

// Update an existing job
export async function updateJob(id: string, formData: FormData) {
  await connectDB();

  const rawData = Object.fromEntries(formData.entries());

  const jobData = {
    title: rawData.title,
    slug: rawData.slug,
    destination: rawData.destination,
    type: rawData.type,
    location: rawData.location,
    description: rawData.description,
    industry: rawData.industry,
    seniority: rawData.seniority,
    isActive: rawData.isActive === 'on',
    
    salary: {
      min: Number(rawData['salary.min']) || 0,
      max: Number(rawData['salary.max']) || 0,
      currency: rawData['salary.currency'] || 'USD',
      period: rawData['salary.period'] || 'month',
    },
    
    employer: {
      name: rawData['employer.name'],
      logo: rawData['employer.logo'] || '',
      verified: rawData['employer.verified'] === 'on',
      description: rawData['employer.description'] || '',
      website: rawData['employer.website'] || '',
    },

    requirements: (rawData.requirements as string)
      ?.split('\n')
      .map(r => r.trim())
      .filter(r => r.length > 0) || [],
      
    responsibilities: (rawData.responsibilities as string)
      ?.split('\n')
      .map(r => r.trim())
      .filter(r => r.length > 0) || [],
  };

  try {
    await Job.findByIdAndUpdate(id, jobData);
    revalidatePath('/admin-dreamsalesjobs/jobs');
    return { success: true };
  } catch (error) {
    console.error('Failed to update job:', error);
    throw new Error('Failed to update job');
  }
}

// Delete a job
export async function deleteJob(id: string) {
  await connectDB();
  
  try {
    await Job.findByIdAndDelete(id);
    revalidatePath('/admin-dreamsalesjobs/jobs');
  } catch (error) {
    console.error('Failed to delete job:', error);
    throw new Error('Failed to delete job');
  }
}
