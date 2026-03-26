'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/mongodb';
import Destination from '@/lib/models/Destination';

export async function createDestination(formData: FormData) {
  await connectDB();
  
  const destData = {
    slug: formData.get('slug'),
    name: formData.get('name'),
    description: formData.get('description'),
    image: formData.get('image'),
    stats: {
      averageEarnings: formData.get('stats.averageEarnings'),
      costOfLiving: formData.get('stats.costOfLiving'),
      visaType: formData.get('stats.visaType'),
    },
    isActive: formData.get('isActive') === 'on',
  };

  try {
    const newDest = new Destination(destData);
    await newDest.save();
    revalidatePath('/admin-dreamsalesjobs/destinations');
    revalidatePath('/destinations');
    return { success: true };
  } catch (error) {
    console.error('Failed to create destination:', error);
    throw new Error('Failed to create destination');
  }
}

export async function updateDestination(id: string, formData: FormData) {
  await connectDB();
  
  const destData = {
    slug: formData.get('slug'),
    name: formData.get('name'),
    description: formData.get('description'),
    image: formData.get('image'),
    stats: {
      averageEarnings: formData.get('stats.averageEarnings'),
      costOfLiving: formData.get('stats.costOfLiving'),
      visaType: formData.get('stats.visaType'),
    },
    isActive: formData.get('isActive') === 'on',
  };

  try {
    await Destination.findByIdAndUpdate(id, destData);
    revalidatePath('/admin-dreamsalesjobs/destinations');
    revalidatePath('/destinations');
    return { success: true };
  } catch (error) {
    console.error('Failed to update destination:', error);
    throw new Error('Failed to update destination');
  }
}

export async function deleteDestination(id: string) {
  await connectDB();
  try {
    await Destination.findByIdAndDelete(id);
    revalidatePath('/admin-dreamsalesjobs/destinations');
    revalidatePath('/destinations');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete destination:', error);
    throw new Error('Failed to delete destination');
  }
}