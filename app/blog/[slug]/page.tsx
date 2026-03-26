import { getPostBySlug, getAllPosts } from '@/lib/api';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Metadata } from 'next';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Dream Sales Jobs Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      authors: [post.author],
      publishedTime: post.date,
      images: [post.image],
    },
  };
}

export const revalidate = 60; // Revalidate every minute

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      {/* Schema Markup for Article and Person (Author) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                "headline": post.title,
                "image": [post.image || 'https://dreamsalesjob-2.vercel.app/images/logo-utama.webp'],
                "datePublished": post.date,
                "dateModified": post.date,
                "author": {
                  "@type": "Person",
                  "@id": `https://dreamsalesjob-2.vercel.app/author/${encodeURIComponent(post.author)}`,
                  "name": post.author,
                  "jobTitle": "Content Writer",
                  "knowsAbout": ["Sales", "Remote Work", "Career Advice"]
                },
                "publisher": {
                  "@type": "Organization",
                  "@id": "https://dreamsalesjob-2.vercel.app/#organization",
                  "name": "Dream Sales Jobs",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://dreamsalesjob-2.vercel.app/images/logo-utama.webp"
                  }
                }
              }
            ]
          })
        }}
      />
      <main className="min-h-screen bg-slate-50 py-12">
        <article className="container mx-auto px-4 md:px-6 max-w-4xl">
          <Link href="/blog" className="inline-flex items-center text-sm text-slate-500 hover:text-primary-600 mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
          </Link>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Header Image */}
            <div className="relative aspect-video w-full">
              <Image
                src={post.image || 'https://placehold.co/1200x600'}
                alt={post.title}
                title={post.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="flex items-center gap-4 text-sm mb-4">
                  <span className="bg-primary-600 px-3 py-1 rounded-full font-semibold uppercase tracking-wider text-xs">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  {post.title}
                </h1>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <div 
                className="prose prose-lg prose-slate max-w-none prose-headings:text-navy-900 prose-a:text-primary-600 hover:prose-a:text-primary-700"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
