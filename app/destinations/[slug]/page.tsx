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
  const destination = await getDestinationBySlug(params.slug);

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
  const destinations = await getAllDestinations();
  return destinations.map((d) => ({
    slug: d.slug,
  }));
}

export default async function DestinationPage({ params }: PageProps) {
  const destination = await getDestinationBySlug(params.slug);

  if (!destination) {
    notFound();
  }

  const jobs = await getJobsByDestination(params.slug);

  return (
    <>
      <Header />
      {/* Schema Markup for LocalBusiness and FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "LocalBusiness",
                "name": `Dream Sales Jobs in ${destination.name}`,
                "image": "https://dreamsalesjob-2.vercel.app/images/logo-utama.png",
                "url": `https://dreamsalesjob-2.vercel.app/destinations/${destination.slug}`,
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": destination.name
                }
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": `What are the average earnings for sales jobs in ${destination.name}?`,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": `Sales professionals in ${destination.name} typically earn around ${destination.stats.averageEarnings}, depending on their experience and the specific role.`
                    }
                  },
                  {
                    "@type": "Question",
                    "name": `How is the cost of living in ${destination.name}?`,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": `The cost of living in ${destination.name} is generally considered ${destination.stats.costOfLiving}. This allows you to maximize your income while enjoying a great lifestyle.`
                    }
                  },
                  {
                    "@type": "Question",
                    "name": `What type of visa is required to work in ${destination.name}?`,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": `Typically, you will need a ${destination.stats.visaType} to legally work in ${destination.name}. Employers often provide assistance with this process.`
                    }
                  },
                  {
                    "@type": "Question",
                    "name": `Are there remote sales jobs available in ${destination.name}?`,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": `Yes, many sales jobs in ${destination.name} offer remote or hybrid flexibility, allowing you to work from beautiful locations while maintaining high productivity.`
                    }
                  },
                  {
                    "@type": "Question",
                    "name": `Do I need to speak the local language to work in sales in ${destination.name}?`,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": `While knowing the local language is helpful, most of the high-ticket sales roles we recruit for in ${destination.name} require fluent English as you will be dealing with international clients.`
                    }
                  }
                ]
              }
            ]
          })
        }}
      />
      <main className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <div className="relative h-[400px] w-full">
           <Image
             src={destination.image}
             alt={destination.name}
             title={destination.name}
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

          {/* SEO Content Block & FAQs */}
          <div className="mb-16 bg-white rounded-xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">Why Choose Sales Jobs in {destination.name}?</h2>
            <div className="prose prose-slate max-w-none text-slate-600 mb-8">
              <p>
                Finding the right high-ticket <strong>sales jobs in {destination.name}</strong> can be a transformative step for your career. Whether you are an Australian, New Zealander, or British professional looking to relocate, {destination.name} offers a unique blend of lifestyle and high earning potential. With its {destination.stats.costOfLiving.toLowerCase()} cost of living and average earnings of {destination.stats.averageEarnings}, professionals can significantly boost their disposable income while enjoying a luxury lifestyle.
              </p>
              <p>
                Our recruitment specialists understand the nuances of the local market. The demand for native English speakers in premium resort environments, real estate, and B2B tech sales is growing rapidly. By securing one of the top <strong>sales jobs in {destination.name}</strong>, you not only gain international experience but also benefit from structured relocation support. Be sure to check our <Link href="/jobs" className="text-primary-600 hover:underline">latest job listings</Link>, read our <Link href="/blog" className="text-primary-600 hover:underline">career advice blog</Link>, or <Link href="/apply" className="text-primary-600 hover:underline">submit your CV</Link> today to get started.
              </p>
            </div>

            <h3 className="text-xl font-bold text-navy-900 mb-6">Frequently Asked Questions</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-slate-800">What are the average earnings for sales jobs in {destination.name}?</h4>
                <p className="text-slate-600 mt-1">Sales professionals in {destination.name} typically earn around {destination.stats.averageEarnings}, depending on their experience and the specific role.</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">How is the cost of living in {destination.name}?</h4>
                <p className="text-slate-600 mt-1">The cost of living in {destination.name} is generally considered {destination.stats.costOfLiving.toLowerCase()}. This allows you to maximize your income while enjoying a great lifestyle.</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">What type of visa is required to work in {destination.name}?</h4>
                <p className="text-slate-600 mt-1">Typically, you will need a {destination.stats.visaType} to legally work in {destination.name}. Employers often provide assistance with this process.</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">Are there remote sales jobs available in {destination.name}?</h4>
                <p className="text-slate-600 mt-1">Yes, many sales jobs in {destination.name} offer remote or hybrid flexibility, allowing you to work from beautiful locations while maintaining high productivity.</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">Do I need to speak the local language to work in sales in {destination.name}?</h4>
                <p className="text-slate-600 mt-1">While knowing the local language is helpful, most of the high-ticket sales roles we recruit for in {destination.name} require fluent English as you will be dealing with international clients.</p>
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
