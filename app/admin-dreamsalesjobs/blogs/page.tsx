import { BlogsClient } from '@/components/admin/BlogsClient';
import connectDB from '@/lib/mongodb';
import BlogModel from '@/lib/models/Blog';

export const metadata = {
  title: 'Manage Blogs | CMS Admin',
};

export const revalidate = 0;

export default async function BlogsAdminPage() {
  await connectDB();
  
  const blogs = await BlogModel.find().sort({ date: -1 }).lean();

  const serialized = blogs.map(blog => ({
    ...blog,
    _id: blog._id.toString(),
    date: (blog as any).date?.toISOString(),
    createdAt: (blog as any).createdAt?.toISOString(),
    updatedAt: (blog as any).updatedAt?.toISOString(),
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
