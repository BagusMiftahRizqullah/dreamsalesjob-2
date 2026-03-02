import { getGuideBySlug, getAllGuides } from '@/lib/api';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Metadata } from 'next';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const guide = getGuideBySlug(params.slug);

  if (!guide) {
    return {
      title: 'Guide Not Found',
    };
  }

  return {
    title: `${guide.title} | Dream Sales Jobs Guide`,
    description: guide.excerpt,
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      type: 'article',
      authors: [guide.author],
      publishedTime: guide.date,
      images: [guide.image],
    },
  };
}

export async function generateStaticParams() {
  const guides = getAllGuides();
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export default function GuidePage({ params }: PageProps) {
  const guide = getGuideBySlug(params.slug);

  if (!guide) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 py-12">
        <article className="container mx-auto px-4 md:px-6 max-w-4xl">
          <Link href="/guides" className="inline-flex items-center text-sm text-slate-500 hover:text-primary-600 mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Guides
          </Link>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Header Image */}
            <div className="relative aspect-video w-full">
              <Image
                src={guide.image || 'https://placehold.co/1200x600'}
                alt={guide.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="flex items-center gap-4 text-sm mb-4">
                  <span className="bg-primary-600 px-3 py-1 rounded-full font-semibold uppercase tracking-wider text-xs">
                    {guide.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={guide.date}>{formatDate(guide.date)}</time>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{guide.author}</span>
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  {guide.title}
                </h1>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <div className="prose prose-lg prose-slate max-w-none prose-headings:text-navy-900 prose-a:text-primary-600 hover:prose-a:text-primary-700">
                <ReactMarkdown>{guide.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
