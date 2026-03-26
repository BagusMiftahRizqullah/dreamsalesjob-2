'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/mongodb';
import Application from '@/lib/models/Application';

export async function updateApplicationStatus(id: string, status: string) {
  try {
    await connectDB();
    await Application.findByIdAndUpdate(id, { status });
    revalidatePath('/admin-dreamsalesjobs/applications');
    return { success: true };
  } catch (error) {
    console.error('Failed to update application status:', error);
    throw new Error('Failed to update application status');
  }
}

export async function deleteApplication(id: string) {
  try {
    await connectDB();
    await Application.findByIdAndDelete(id);
    revalidatePath('/admin-dreamsalesjobs/applications');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete application:', error);
    throw new Error('Failed to delete application');
  }
}
