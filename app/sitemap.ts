import { MetadataRoute } from 'next';
import { getAllJobs, getAllDestinations, getAllGuides } from '@/lib/api';

const BASE_URL = 'https://dreamsalesjobs.com'; // Replace with actual domain

export default function sitemap(): MetadataRoute.Sitemap {
  const jobs = getAllJobs();
  const destinations = getAllDestinations();
  const guides = getAllGuides();

  const staticRoutes = [
    '',
    '/jobs',
    '/destinations',
    '/about',
    '/contact',
    '/guides',
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

  const guideRoutes = guides.map((guide) => ({
    url: `${BASE_URL}/guides/${guide.slug}`,
    lastModified: new Date(guide.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...jobRoutes, ...destinationRoutes, ...guideRoutes];
}
