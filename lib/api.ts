import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Job, Guide, Testimonial, Destination } from '@/types';

const jobsDirectory = path.join(process.cwd(), 'content/jobs');
const guidesDirectory = path.join(process.cwd(), 'content/guides');
const testimonialsPath = path.join(process.cwd(), 'content/testimonials.json');

// --- Jobs ---

export function getAllJobs(): Job[] {
  if (!fs.existsSync(jobsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(jobsDirectory).filter(file => file.endsWith('.json'));
  const allJobsData = fileNames.map((fileName) => {
    const fullPath = path.join(jobsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const job = JSON.parse(fileContents) as Job;
    return job;
  });

  return allJobsData.sort((a, b) => {
    if (a.postedDate < b.postedDate) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getJobBySlug(slug: string): Job | undefined {
  const jobs = getAllJobs();
  return jobs.find((job) => job.slug === slug);
}

export function getJobsByDestination(destination: string): Job[] {
  const jobs = getAllJobs();
  return jobs.filter((job) => job.destination === destination);
}

// --- Guides ---

export function getAllGuides(): Guide[] {
  if (!fs.existsSync(guidesDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(guidesDirectory).filter(file => file.endsWith('.mdx'));
  const allGuidesData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(guidesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: slug,
      title: data.title,
      excerpt: data.excerpt,
      date: data.date,
      author: data.author,
      content: content,
      image: data.image,
      category: data.category,
    } as Guide;
  });

  return allGuidesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getGuideBySlug(slug: string): Guide | undefined {
  const guides = getAllGuides();
  return guides.find((guide) => guide.slug === slug);
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
// Hardcoding destinations for now as they are static data mostly
export const destinations: Destination[] = [
 
  {
    slug: 'bali',
    name: 'Bali',
    description: 'The Island of Gods offers a perfect blend of luxury lifestyle and high-ticket sales opportunities in real estate and hospitality.',
    image: 'https://placehold.co/800x600/0f172a/ffffff?text=Bali',
    stats: {
      averageEarnings: '$80k - $150k',
      costOfLiving: 'Low ($2k/mo)',
      visaType: 'B211A / KITAS'
    }
  },
  {
    slug: 'vietnam',
    name: 'Vietnam',
    description: 'One of the fastest-growing economies in Asia. Huge demand for tech sales and recruitment consultants in Ho Chi Minh City.',
    image: 'https://placehold.co/800x600/0f172a/ffffff?text=Vietnam',
    stats: {
      averageEarnings: '$50k - $100k',
      costOfLiving: 'Very Low ($1.2k/mo)',
      visaType: 'Business Visa'
    }
  },
   {
    slug: 'thailand',
    name: 'Thailand',
    description: 'From Bangkok skyscrapers to Phuket beaches, Thailand is a hub for expat sales professionals in finance, insurance, and marine industries.',
    image: 'https://placehold.co/800x600/0f172a/ffffff?text=Thailand',
    stats: {
      averageEarnings: '$60k - $120k',
      costOfLiving: 'Low ($1.5k/mo)',
      visaType: 'LTR / Non-B'
    }
  },
 
  {
    slug: 'remote',
    name: 'Remote',
    description: 'Work from anywhere with flexible schedules and global clients.',
    image: 'https://placehold.co/800x600/0f172a/ffffff?text=Remote',
    stats: {
      averageEarnings: '$60k - $120k',
      costOfLiving: 'Low ($1.5k/mo)',
      visaType: 'LTR / Non-B'
    }
  },
  
  // {
  //   slug: 'indonesia',
  //   name: 'Indonesia',
  //   description: 'Beyond Bali, opportunities abound in Jakarta’s bustling tech and business sectors.',
  //   image: 'https://placehold.co/800x600/0f172a/ffffff?text=Indonesia',
  //   stats: {
  //     averageEarnings: '$50k - $100k',
  //     costOfLiving: 'Low ($1.2k/mo)',
  //     visaType: 'KITAS'
  //   }
  // }
];

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

export function getAllDestinations(): Destination[] {
  return destinations;
}
