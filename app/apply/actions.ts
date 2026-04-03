'use server';

import prisma from '@/lib/prisma';

export async function submitApplication(data: any) {
  try {
    const newApplication = await prisma.application.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        linkedin: data.linkedin || '',
        experience: data.experience,
        destination: data.destination,
        jobSlug: data.jobSlug || '',
        jobTitle: data.jobTitle || '',
        status: 'new',
      }
    });

    return { success: true, id: newApplication.id };
  } catch (error) {
    console.error('Failed to submit application:', error);
    return { success: false, error: 'Failed to submit application' };
  }
}
