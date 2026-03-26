'use client';

import { useState, useMemo, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { BlogForm } from './BlogForm';
import { Pagination } from './Pagination';
import { deleteBlog } from '@/app/admin-dreamsalesjobs/blogs/actions';
import { formatDate } from '@/lib/utils';

interface BlogsClientProps {
  initialBlogs: any[];
}

export function BlogsClient({ initialBlogs }: BlogsClientProps) {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [isAdding, setIsAdding] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [blogs, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const paginatedBlogs = filteredBlogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlog(id);
        setBlogs(blogs.filter(b => b._id.toString() !== id));
      } catch (error) {
        alert('Failed to delete blog');
      }
    }
  };

  if (isAdding || editingBlog) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <BlogForm
          blog={editingBlog}
          onSuccess={() => {
            setIsAdding(false);
            setEditingBlog(null);
            window.location.reload();
          }}
          onCancel={() => {
            setIsAdding(false);
            setEditingBlog(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Blog Posts</h2>
          <p className="text-slate-500 text-sm mt-1">Manage articles and resources</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 w-full sm:w-64 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>
          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Post
          </button>
        </div>
      </div>

      <div className="overflow-auto max-h-[calc(100vh-200px)] relative">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead className="sticky top-0 z-10 bg-slate-50 shadow-sm ring-1 ring-slate-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Title / Slug</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Category</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Date</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {paginatedBlogs.map((blog) => (
              <tr key={blog._id.toString()} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">{blog.title}</div>
                  <div className="text-sm text-slate-500">{blog.slug}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                    {blog.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {formatDate(blog.date)}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    blog.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-slate-100 text-slate-800'
                  }`}>
                    {blog.isActive ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingBlog(blog)}
                      className="p-2 text-slate-400 hover:text-primary-600 transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id.toString())}
                      className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {paginatedBlogs.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  No blog posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredBlogs.length}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}
