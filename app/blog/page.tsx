import { getAllPosts } from '@/lib/api';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { Calendar, User } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog & Resources | Dream Sales Jobs',
  description: 'Learn everything you need to know about relocating and working in sales in Southeast Asia.',
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
              Blog & Resources
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Expert advice on visas, cost of living, and landing the perfect sales role abroad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
                <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-200 h-full flex flex-col">
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={post.image || 'https://placehold.co/600x400'}
                      alt={post.title}
                      title={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-navy-900 uppercase tracking-wide">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                    <h2 className="text-xl font-bold text-navy-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-1">
                      {post.excerpt}
                    </p>
                    <span className="text-primary-600 font-medium text-sm inline-flex items-center mt-auto">
                      Read Article &rarr;
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
