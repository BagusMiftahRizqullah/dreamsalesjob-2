export interface Job {
  id: string;
  slug: string;
  title: string;
  destination: 'bali' | 'vietnam' | 'thailand' | 'singapore' | 'remote' | 'cambodia' | 'greece' | 'spain' | 'italy' | 'france' | 'united-kingdom' | 'egypt' | 'germany' | 'maldives' | 'india' | 'indonesia';
  type: 'full-time' | 'contract';
  location: string;
  salary: {
    min: number;
    max: number;
    currency: string;
    period: 'year' | 'month';
  };
  description: string;
  requirements: string[];
  responsibilities: string[];
  postedDate: string;
  employer: {
    name: string;
    logo: string;
    verified: boolean;
    description?: string;
    website?: string;
  };
  industry?: string;
  seniority?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  location: string;
  image: string;
  content: string;
  type: 'candidate' | 'employer';
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  content: string; // Markdown content
  image: string;
  category: string;
}

export interface Destination {
  slug: string;
  name: string;
  description: string;
  image: string;
  stats: {
    averageEarnings: string;
    costOfLiving: string;
    visaType: string;
  };
}
