import { getJobsFromDB, getJobBySlug, getDestinationBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { MapPin, DollarSign, Briefcase, Clock, ArrowLeft, CheckCircle, Share2 } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';
import { Metadata } from 'next';
import { Job } from '@/types';
import Image from 'next/image';

interface PageProps {
  params: {
    slug: string;
  };
}

export const revalidate = 60; // Revalidate every minute

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const job = await getJobBySlug(params.slug);

  if (!job) {
    return {
      title: 'Job Not Found',
    };
  }

  return {
    title: `${job.title} in ${job.location} | Dream Sales Jobs`,
    description: `Apply for ${job.title} at ${job.employer.name}. Earn ${formatCurrency(job.salary.min)} - ${formatCurrency(job.salary.max)}.`,
    openGraph: {
      title: `${job.title} in ${job.location}`,
      description: `Apply for ${job.title} at ${job.employer.name}.`,
      type: 'article',
    },
  };
}

export async function generateStaticParams() {
  const jobs = await getJobsFromDB();
  return jobs.map((job) => ({
    slug: job.slug,
  }));
}

export default async function JobPage({ params }: PageProps) {
  const job = await getJobBySlug(params.slug);

  if (!job) {
    notFound();
  }

  // Get related jobs
  const allJobs = await getJobsFromDB();
  const relatedJobs = allJobs
    .filter((j) => j.id !== job.id && (j.destination === job.destination || j.type === job.type))
    .slice(0, 3);

  const destination = await getDestinationBySlug(job.destination);
  const bgImage = destination?.image || '/images/place/bali.png';

  // JSON-LD for JobPosting
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    identifier: {
      '@type': 'PropertyValue',
      name: job.employer.name,
      value: job.id,
    },
    datePosted: job.postedDate,
    employmentType: job.type === 'full-time' ? 'FULL_TIME' : 'CONTRACTOR',
    hiringOrganization: {
      '@type': 'Organization',
      name: job.employer.name,
      sameAs: job.employer.website,
      logo: job.employer.logo,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location,
        addressCountry: job.destination === 'salesjobsbali' ? 'ID' : 
                        job.destination === 'salesjobsthailand' ? 'TH' : 
                        job.destination === 'salesjobsvietnam' ? 'VN' : 
                        job.destination === 'singapore' ? 'SG' : '',
      },
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: job.salary.currency,
      value: {
        '@type': 'QuantitativeValue',
        minValue: job.salary.min,
        maxValue: job.salary.max,
        unitText: job.salary.period.toUpperCase(),
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
        <Image
          src={bgImage}
          alt={job.location}
          title={job.location}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-navy-900/70" />
        <div className="container relative h-full flex flex-col justify-center">
          <div className="max-w-4xl">
            <Link href="/jobs" className="inline-flex items-center text-sm text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Jobs
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{job.title}</h1>
            <div className="flex flex-wrap gap-4 text-white/90">
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-secondary-500" />
                {job.location}
              </div>
              <div className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-secondary-500" />
                {job.salary.min === 0 && job.salary.max === 0 ? 'High Commission' : `${formatCurrency(job.salary.min)} - ${formatCurrency(job.salary.max)} / ${job.salary.period}`}
              </div>
              <div className="flex items-center">
                <Briefcase className="mr-2 h-5 w-5 text-secondary-500" />
                {job.type}
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="min-h-screen bg-slate-50 py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Job Description */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-navy-900 mb-2">{job.title}</h1>
                    <div className="flex items-center gap-2 text-slate-600">
                      <span className="font-medium text-lg">{job.employer.name}</span>
                      {job.employer.verified && (
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                  <Button variant="outline" size="icon" className="text-slate-400 hover:text-primary-600">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-4 mb-8 border-b border-slate-100 pb-8">
                  <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-3 py-2 rounded-md">
                    <MapPin className="h-5 w-5 text-slate-400" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-3 py-2 rounded-md">
                    <DollarSign className="h-5 w-5 text-slate-400" />
                    <span>{job.salary.min === 0 && job.salary.max === 0 ? 'High Commission' : `${formatCurrency(job.salary.min)} - ${formatCurrency(job.salary.max)} / ${job.salary.period}`}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-3 py-2 rounded-md">
                    <Briefcase className="h-5 w-5 text-slate-400" />
                    <span className="capitalize">{job.type.replace('-', ' ')}</span>
                  </div>
                </div>

                <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: job.description }} />
              </div>

              {/* What happens next */}
              <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-navy-900 mb-6">What happens after you apply?</h3>
                <div className="space-y-6">
                   <div className="flex gap-4">
                     <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold">1</div>
                     <div>
                       <h4 className="font-medium text-navy-900">Application Review (48h)</h4>
                       <p className="text-sm text-slate-500">Our team screens your CV for match with the employer&apos;s needs.</p>
                     </div>
                   </div>
                   <div className="flex gap-4">
                     <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold">2</div>
                     <div>
                       <h4 className="font-medium text-navy-900">Discovery Call</h4>
                       <p className="text-sm text-slate-500">A quick chat to discuss your experience and motivation.</p>
                     </div>
                   </div>
                   <div className="flex gap-4">
                     <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold">3</div>
                     <div>
                       <h4 className="font-medium text-navy-900">Employer Interview</h4>
                       <p className="text-sm text-slate-500">Direct interview with the hiring manager.</p>
                     </div>
                   </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm sticky top-24">
                <h3 className="text-lg font-semibold text-navy-900 mb-4">Interested?</h3>
                <Link href={`/apply?job=${job.slug}&title=${encodeURIComponent(job.title)}`} className="block w-full">
                  <Button size="lg" className="w-full bg-secondary-500 hover:bg-secondary-600 text-white font-bold shadow-lg shadow-secondary-500/20">
                    Apply Now
                  </Button>
                </Link>
                <p className="text-xs text-center text-slate-400 mt-4">
                  By applying, you agree to our Terms & Privacy Policy.
                </p>
                
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <h4 className="text-sm font-semibold text-navy-900 mb-2">About the Employer</h4>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">
                    {job.employer.description || `${job.employer.name} is a verified partner of Dream Sales Jobs. They have a track record of success and provide excellent relocation support.`}
                  </p>
                  {job.employer.website && (
                    <a href={job.employer.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-600 hover:underline">
                      Visit Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
