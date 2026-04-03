'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';

export async function deleteBlog(id: string) {
  try {
    await prisma.blog.delete({
      where: { id }
    });
    revalidatePath('/admin-dreamsalesjobs/blogs');
    revalidatePath('/blog');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete blog:', error);
    throw new Error('Failed to delete blog');
  }
}

export async function createBlog(formData: FormData) {
  const blogData = {
    slug: formData.get('slug') as string,
    title: formData.get('title') as string,
    excerpt: (formData.get('excerpt') as string) || '',
    content: formData.get('content') as string,
    image: (formData.get('image') as string) || '',
    category: (formData.get('category') as string) || 'General',
    author: (formData.get('author') as string) || 'Team DSJ',
    date: formData.get('date') ? new Date(formData.get('date') as string) : new Date(),
    isActive: formData.get('isActive') === 'on',
  };

  try {
    await prisma.blog.create({
      data: blogData
    });
    revalidatePath('/admin-dreamsalesjobs/blogs');
    revalidatePath('/blog');
    return { success: true };
  } catch (error) {
    console.error('Failed to create blog:', error);
    throw new Error('Failed to create blog');
  }
}

export async function updateBlog(id: string, formData: FormData) {
  const blogData = {
    slug: formData.get('slug') as string,
    title: formData.get('title') as string,
    excerpt: (formData.get('excerpt') as string) || '',
    content: formData.get('content') as string,
    image: (formData.get('image') as string) || '',
    category: (formData.get('category') as string) || 'General',
    author: (formData.get('author') as string) || 'Team DSJ',
    date: formData.get('date') ? new Date(formData.get('date') as string) : new Date(),
    isActive: formData.get('isActive') === 'on',
  };

  try {
    await prisma.blog.update({
      where: { id },
      data: blogData
    });
    revalidatePath('/admin-dreamsalesjobs/blogs');
    revalidatePath('/blog');
    return { success: true };
  } catch (error) {
    console.error('Failed to update blog:', error);
    throw new Error('Failed to update blog');
  }
}
