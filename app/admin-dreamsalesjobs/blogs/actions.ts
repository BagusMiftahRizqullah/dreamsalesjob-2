'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';

export async function deleteBlog(id: string) {
  await connectDB();
  try {
    await Blog.findByIdAndDelete(id);
    revalidatePath('/admin-dreamsalesjobs/blogs');
    revalidatePath('/blog');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete blog:', error);
    throw new Error('Failed to delete blog');
  }
}

export async function createBlog(formData: FormData) {
  await connectDB();
  
  const blogData = {
    slug: formData.get('slug'),
    title: formData.get('title'),
    excerpt: formData.get('excerpt'),
    content: formData.get('content'),
    image: formData.get('image'),
    category: formData.get('category'),
    author: formData.get('author'),
    date: formData.get('date') ? new Date(formData.get('date') as string) : new Date(),
    isActive: formData.get('isActive') === 'on',
  };

  try {
    await Blog.create(blogData);
    revalidatePath('/admin-dreamsalesjobs/blogs');
    revalidatePath('/blog');
    return { success: true };
  } catch (error) {
    console.error('Failed to create blog:', error);
    throw new Error('Failed to create blog');
  }
}

export async function updateBlog(id: string, formData: FormData) {
  await connectDB();
  
  const blogData = {
    slug: formData.get('slug'),
    title: formData.get('title'),
    excerpt: formData.get('excerpt'),
    content: formData.get('content'),
    image: formData.get('image'),
    category: formData.get('category'),
    author: formData.get('author'),
    date: formData.get('date') ? new Date(formData.get('date') as string) : new Date(),
    isActive: formData.get('isActive') === 'on',
  };

  try {
    await Blog.findByIdAndUpdate(id, blogData);
    revalidatePath('/admin-dreamsalesjobs/blogs');
    revalidatePath('/blog');
    return { success: true };
  } catch (error) {
    console.error('Failed to update blog:', error);
    throw new Error('Failed to update blog');
  }
}
