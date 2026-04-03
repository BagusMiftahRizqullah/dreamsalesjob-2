import { BlogsClient } from '@/components/admin/BlogsClient';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Manage Blogs | CMS Admin',
};

export const revalidate = 0;

export default async function BlogsAdminPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: { date: 'desc' }
  });

  const serialized = blogs.map(blog => ({
    ...blog,
    _id: blog.id,
    date: blog.date?.toISOString(),
    createdAt: blog.createdAt?.toISOString(),
    updatedAt: blog.updatedAt?.toISOString(),
  }));

  return (
    <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
      <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Manage Blogs</h1>
            <p className="text-slate-600 mt-2">Create and edit blog posts and resources.</p>
          </div>
        </header>
        
        <BlogsClient initialBlogs={serialized} />
      </div>
    </main>
  );
}
