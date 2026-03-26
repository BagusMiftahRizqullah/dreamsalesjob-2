'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import Link from 'next/link';

export default function BlogPreviewPage() {
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    // Read from localStorage only on client side
    const previewData = localStorage.getItem('blog_preview_data');
    if (previewData) {
      try {
        setPost(JSON.parse(previewData));
      } catch (e) {
        console.error('Failed to parse preview data');
      }
    }
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-slate-800">No Preview Data Found</h1>
          <p className="text-slate-500">Please go back to the editor and click Preview again.</p>
          <button 
            onClick={() => window.close()}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Close Tab
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 py-12">
        <article className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="mb-8">
            <div className="inline-flex items-center text-sm font-semibold px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg mb-4">
              <span className="mr-2">⚠️</span> This is a live preview. Changes are not saved yet.
            </div>
            <br />
            <button onClick={() => window.close()} className="inline-flex items-center text-sm text-slate-500 hover:text-primary-600 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Editor
            </button>
          </div>

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
