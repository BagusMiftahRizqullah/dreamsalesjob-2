import { MetadataRoute } from 'next';
import { getAllJobs, getAllDestinations, getAllPosts } from '@/lib/api';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Don't cache sitemap to prevent build timeouts

const BASE_URL = 'https://dreamsalesjob-2.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [jobs, destinations, posts] = await Promise.all([
    getAllJobs(),
    getAllDestinations(),
    getAllPosts(),
  ]);

  const staticRoutes = [
    '',
    '/jobs',
    '/destinations',
    '/about',
    '/contact',
    '/blog',
    '/apply',
    '/hire',
    '/au',
    '/nz',
    '/uk',
    '/candidates',
    '/employers',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const jobRoutes = jobs.map((job) => ({
    url: `${BASE_URL}/jobs/${job.slug}`,
    lastModified: new Date(job.postedDate),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const destinationRoutes = destinations.map((destination) => ({
    url: `${BASE_URL}/destinations/${destination.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const blogRoutes = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...jobRoutes, ...destinationRoutes, ...blogRoutes];
}
