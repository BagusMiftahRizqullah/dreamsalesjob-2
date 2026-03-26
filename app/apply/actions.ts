'use server';

import connectDB from '@/lib/mongodb';
import Application from '@/lib/models/Application';

export async function submitApplication(data: any) {
  try {
    await connectDB();
    
    const newApplication = await Application.create({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      linkedin: data.linkedin || '',
      experience: data.experience,
      destination: data.destination,
      jobSlug: data.jobSlug || '',
      jobTitle: data.jobTitle || '',
      status: 'new',
    });

    return { success: true, id: newApplication._id.toString() };
  } catch (error) {
    console.error('Failed to submit application:', error);
    return { success: false, error: 'Failed to submit application' };
  }
}
