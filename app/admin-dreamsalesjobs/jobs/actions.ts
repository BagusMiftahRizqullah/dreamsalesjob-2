'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

// Create a new job
export async function createJob(formData: FormData) {
  // Convert FormData to object and handle arrays properly
  const rawData = Object.fromEntries(formData.entries());
  
  // Basic slug generation from title if not provided
  let slug = rawData.slug as string;
  if (!slug) {
    slug = (rawData.title as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }

  const jobData = {
    title: rawData.title as string,
    slug,
    destination: rawData.destination as string,
    type: (rawData.type as string) || 'full-time',
    location: rawData.location as string,
    description: rawData.description as string,
    industry: (rawData.industry as string) || '',
    seniority: (rawData.seniority as string) || '',
    isActive: rawData.isActive === 'on',
    
    // Parse nested objects
    salary: {
      min: Number(rawData['salary.min']) || 0,
      max: Number(rawData['salary.max']) || 0,
      currency: (rawData['salary.currency'] as string) || 'USD',
      period: (rawData['salary.period'] as string) || 'month',
    },
    
    employer: {
      name: rawData['employer.name'] as string,
      logo: (rawData['employer.logo'] as string) || '',
      verified: rawData['employer.verified'] === 'on',
      description: (rawData['employer.description'] as string) || '',
      website: (rawData['employer.website'] as string) || '',
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
    await prisma.job.create({
      data: jobData
    });
    revalidatePath('/admin-dreamsalesjobs/jobs');
    return { success: true };
  } catch (error) {
    console.error('Failed to create job:', error);
    throw new Error('Failed to create job');
  }
}

// Update an existing job
export async function updateJob(id: string, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());

  const jobData = {
    title: rawData.title as string,
    slug: rawData.slug as string,
    destination: rawData.destination as string,
    type: (rawData.type as string) || 'full-time',
    location: rawData.location as string,
    description: rawData.description as string,
    industry: (rawData.industry as string) || '',
    seniority: (rawData.seniority as string) || '',
    isActive: rawData.isActive === 'on',
    
    salary: {
      min: Number(rawData['salary.min']) || 0,
      max: Number(rawData['salary.max']) || 0,
      currency: (rawData['salary.currency'] as string) || 'USD',
      period: (rawData['salary.period'] as string) || 'month',
    },
    
    employer: {
      name: rawData['employer.name'] as string,
      logo: (rawData['employer.logo'] as string) || '',
      verified: rawData['employer.verified'] === 'on',
      description: (rawData['employer.description'] as string) || '',
      website: (rawData['employer.website'] as string) || '',
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
    await prisma.job.update({
      where: { id },
      data: jobData
    });
    revalidatePath('/admin-dreamsalesjobs/jobs');
    return { success: true };
  } catch (error) {
    console.error('Failed to update job:', error);
    throw new Error('Failed to update job');
  }
}

// Delete a job
export async function deleteJob(id: string) {
  try {
    await prisma.job.delete({
      where: { id }
    });
    revalidatePath('/admin-dreamsalesjobs/jobs');
  } catch (error) {
    console.error('Failed to delete job:', error);
    throw new Error('Failed to delete job');
  }
}
