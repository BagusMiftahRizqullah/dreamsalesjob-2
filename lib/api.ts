import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Job, BlogPost, Testimonial, Destination } from '@/types';
import connectDB from './mongodb';
import JobModel from './models/Job';
import DestinationModel from './models/Destination';
import BlogModel from './models/Blog';

const postsDirectory = path.join(process.cwd(), 'content/blog');
const testimonialsPath = path.join(process.cwd(), 'content/testimonials.json');

// --- Jobs ---

export async function getJobsFromDB(): Promise<Job[]> {
  try {
    await connectDB();
    const jobs = await JobModel.find({ isActive: true }).sort({ postedDate: -1 }).lean();
    
    return jobs.map((job: any) => ({
      id: job._id.toString(),
      slug: job.slug,
      title: job.title,
      destination: job.destination,
      type: job.type,
      location: job.location,
      salary: job.salary,
      description: job.description,
      requirements: job.requirements || [],
      responsibilities: job.responsibilities || [],
      postedDate: job.postedDate.toISOString(),
      employer: job.employer,
      industry: job.industry,
      seniority: job.seniority,
    }));
  } catch (error) {
    console.error('Failed to fetch jobs from DB:', error);
    return [];
  }
}

export async function getAllJobs(): Promise<Job[]> {
  return getJobsFromDB();
}

export async function getJobBySlug(slug: string): Promise<Job | null> {
  try {
    await connectDB();
    const job = await JobModel.findOne({ slug, isActive: true }).lean();
    
    if (!job) return null;
    
    return {
      id: job._id.toString(),
      slug: job.slug,
      title: job.title,
      destination: job.destination,
      type: job.type,
      location: job.location,
      salary: job.salary,
      description: job.description,
      requirements: job.requirements || [],
      responsibilities: job.responsibilities || [],
      postedDate: job.postedDate.toISOString(),
      employer: job.employer,
      industry: job.industry,
      seniority: job.seniority,
    } as Job;
  } catch (error) {
    console.error('Failed to fetch job by slug from DB:', error);
    return null;
  }
}

export async function getJobsByDestination(destination: string): Promise<Job[]> {
  const jobs = await getAllJobs();
  return jobs.filter((job) => job.destination === destination);
}

// --- Blog ---

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    await connectDB();
    const posts = await BlogModel.find({ isActive: true }).sort({ date: -1 }).lean();
    return posts.map(post => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      date: post.date.toISOString(),
      author: post.author,
      content: post.content,
      image: post.image,
      category: post.category,
    })) as BlogPost[];
  } catch (error) {
    console.error('Failed to fetch posts from DB:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    await connectDB();
    const post = await BlogModel.findOne({ slug, isActive: true }).lean();
    if (!post) return undefined;
    return {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      date: post.date.toISOString(),
      author: post.author,
      content: post.content,
      image: post.image,
      category: post.category,
    } as BlogPost;
  } catch (error) {
    console.error('Failed to fetch post by slug from DB:', error);
    return undefined;
  }
}

// --- Testimonials ---

export function getAllTestimonials(): Testimonial[] {
  if (!fs.existsSync(testimonialsPath)) {
    return [];
  }
  const fileContents = fs.readFileSync(testimonialsPath, 'utf8');
  const testimonials = JSON.parse(fileContents) as Testimonial[];
  return testimonials;
}

// --- Destinations ---

export async function getDestinationsFromDB(): Promise<Destination[]> {
  try {
    await connectDB();
    const destinations = await DestinationModel.find({ isActive: true }).lean();
    
    return destinations.map((dest: any) => ({
      slug: dest.slug,
      name: dest.name,
      description: dest.description,
      image: dest.image,
      stats: dest.stats,
    }));
  } catch (error) {
    console.error('Failed to fetch destinations from DB:', error);
    return [];
  }
}

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  try {
    await connectDB();
    const dest = await DestinationModel.findOne({ slug, isActive: true }).lean();
    if (!dest) return null;
    return {
      slug: dest.slug,
      name: dest.name,
      description: dest.description,
      image: dest.image,
      stats: dest.stats,
    } as Destination;
  } catch (error) {
    console.error('Failed to fetch destination by slug from DB:', error);
    return null;
  }
}

export async function getAllDestinations(): Promise<Destination[]> {
  return getDestinationsFromDB();
}
