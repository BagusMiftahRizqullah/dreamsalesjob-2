'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';

export async function createDestination(formData: FormData) {
  const destData = {
    slug: formData.get('slug') as string,
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    image: formData.get('image') as string,
    stats: {
      averageEarnings: formData.get('stats.averageEarnings') as string,
      costOfLiving: formData.get('stats.costOfLiving') as string,
      visaType: formData.get('stats.visaType') as string,
    },
    isActive: formData.get('isActive') === 'on',
  };

  try {
    await prisma.destination.create({
      data: destData
    });
    revalidatePath('/admin-dreamsalesjobs/destinations');
    revalidatePath('/destinations');
    return { success: true };
  } catch (error) {
    console.error('Failed to create destination:', error);
    throw new Error('Failed to create destination');
  }
}

export async function updateDestination(id: string, formData: FormData) {
  const destData = {
    slug: formData.get('slug') as string,
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    image: formData.get('image') as string,
    stats: {
      averageEarnings: formData.get('stats.averageEarnings') as string,
      costOfLiving: formData.get('stats.costOfLiving') as string,
      visaType: formData.get('stats.visaType') as string,
    },
    isActive: formData.get('isActive') === 'on',
  };

  try {
    await prisma.destination.update({
      where: { id },
      data: destData
    });
    revalidatePath('/admin-dreamsalesjobs/destinations');
    revalidatePath('/destinations');
    return { success: true };
  } catch (error) {
    console.error('Failed to update destination:', error);
    throw new Error('Failed to update destination');
  }
}

export async function deleteDestination(id: string) {
  try {
    await prisma.destination.delete({
      where: { id }
    });
    revalidatePath('/admin-dreamsalesjobs/destinations');
    revalidatePath('/destinations');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete destination:', error);
    throw new Error('Failed to delete destination');
  }
}