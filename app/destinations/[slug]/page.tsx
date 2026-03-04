import { getDestinationBySlug, getJobsByDestination, getAllDestinations } from '@/lib/api';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { JobCard } from '@/components/jobs/job-card';
import { Metadata } from 'next';
import Image from 'next/image';
import { ArrowLeft, Wallet, Home, Plane } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const destination = getDestinationBySlug(params.slug);

  if (!destination) {
    return {
      title: 'Destination Not Found',
    };
  }

  return {
    title: `Sales Jobs in ${destination.name} | Dream Sales Jobs`,
    description: `Find high-paying sales jobs in ${destination.name}. ${destination.description}`,
  };
}

export async function generateStaticParams() {
  const destinations = getAllDestinations();
  return destinations.map((d) => ({
    slug: d.slug,
  }));
}

export default function DestinationPage({ params }: PageProps) {
  const destination = getDestinationBySlug(params.slug);

  if (!destination) {
    notFound();
  }

  const jobs = getJobsByDestination(params.slug);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <div className="relative h-[400px] w-full">
           <Image
             src={destination.image}
             alt={destination.name}
             fill
             className="object-cover brightness-50"
             priority
           />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
           <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
               Live & Work in {destination.name}
             </h1>
             <p className="text-lg md:text-xl text-slate-200 max-w-2xl">
               {destination.description}
             </p>
           </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 -mt-16 relative z-10">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <Wallet className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Avg. Earnings</p>
                <p className="text-lg font-bold text-navy-900">{destination.stats.averageEarnings}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Home className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Cost of Living</p>
                <p className="text-lg font-bold text-navy-900">{destination.stats.costOfLiving}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                <Plane className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Visa Type</p>
                <p className="text-lg font-bold text-navy-900">{destination.stats.visaType}</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <Link href="/destinations" className="inline-flex items-center text-sm text-slate-500 hover:text-primary-600 mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Destinations
            </Link>
            <h2 className="text-3xl font-bold text-navy-900 mb-6">Open Roles in {destination.name}</h2>
            
            {jobs.length > 0 ? (
              <div className="grid gap-6">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
                <h3 className="text-xl font-medium text-navy-900 mb-2">No jobs currently available in {destination.name}</h3>
                <p className="text-slate-500 mb-6">Be the first to know when new roles are added.</p>
                <Link href="/contact">
                  <Button variant="outline">Join the Waitlist</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
