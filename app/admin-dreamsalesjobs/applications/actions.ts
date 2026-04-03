'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';

export async function updateApplicationStatus(id: string, status: string) {
  try {
    await prisma.application.update({
      where: { id },
      data: { status }
    });
    revalidatePath('/admin-dreamsalesjobs/applications');
    return { success: true };
  } catch (error) {
    console.error('Failed to update application status:', error);
    throw new Error('Failed to update application status');
  }
}

export async function deleteApplication(id: string) {
  try {
    await prisma.application.delete({
      where: { id }
    });
    revalidatePath('/admin-dreamsalesjobs/applications');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete application:', error);
    throw new Error('Failed to delete application');
  }
}
