'use client';

import { useState, useRef } from 'react';
import { createBlog, updateBlog } from '@/app/admin-dreamsalesjobs/blogs/actions';
import { Loader2, Eye } from 'lucide-react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// Dynamically import react-quill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { 
  ssr: false,
  loading: () => <div className="h-64 w-full bg-slate-50 border border-slate-200 rounded-lg animate-pulse flex items-center justify-center text-slate-400">Loading Editor...</div>
});

interface BlogFormProps {
  blog?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
];

export function BlogForm({ blog, onSuccess, onCancel }: BlogFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [content, setContent] = useState(blog?.content || '');
  const formRef = useRef<HTMLFormElement>(null);

  const isEditing = !!blog;

  const handlePreview = () => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    
    const previewData = {
      title: formData.get('title') || 'Untitled Preview',
      slug: formData.get('slug') || 'preview-slug',
      excerpt: formData.get('excerpt') || '',
      content: content,
      image: formData.get('image') || '',
      category: formData.get('category') || 'General',
      author: formData.get('author') || 'Team DSJ',
      date: formData.get('date') ? new Date(formData.get('date') as string).toISOString() : new Date().toISOString(),
    };

    localStorage.setItem('blog_preview_data', JSON.stringify(previewData));
    window.open('/blog/preview', '_blank');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    // Add the react-quill content to formData
    formData.set('content', content);

    try {
      if (isEditing) {
        await updateBlog(blog._id, formData);
      } else {
        await createBlog(formData);
      }
      onSuccess();
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            {isEditing ? 'Edit Blog Post' : 'Add New Blog Post'}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {isEditing ? 'Update the details of your blog post below.' : 'Fill in the details to create a new blog post.'}
          </p>
        </div>
        <button
          type="button"
          onClick={handlePreview}
          className="px-4 py-2 border border-primary-300 text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100 font-medium flex items-center transition-colors shadow-sm"
        >
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Basic Details */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-semibold text-navy-900 border-b border-slate-100 pb-2">Basic Details</h3>
            
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                required
                defaultValue={blog?.title}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors"
                placeholder="e.g. 10 Reasons to Work in Bali"
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-slate-700 mb-1">Slug *</label>
              <input
                type="text"
                id="slug"
                name="slug"
                required
                defaultValue={blog?.slug}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors"
                placeholder="e.g. 10-reasons-to-work-in-bali"
              />
            </div>

            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-slate-700 mb-1">Excerpt</label>
              <textarea
                id="excerpt"
                name="excerpt"
                rows={3}
                defaultValue={blog?.excerpt}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors"
                placeholder="Brief summary of the article..."
              />
            </div>
          </div>
        </div>

        {/* Right Column: Meta & Media */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-semibold text-navy-900 border-b border-slate-100 pb-2">Meta & Media</h3>
            
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-slate-700 mb-1">Featured Image URL</label>
              <input
                type="text"
                id="image"
                name="image"
                defaultValue={blog?.image}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors"
                placeholder="/images/blog/cover.webp"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  defaultValue={blog?.category || 'General'}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors"
                />
              </div>
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-slate-700 mb-1">Author</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  defaultValue={blog?.author || 'Team DSJ'}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-1">Publish Date</label>
              <input
                type="date"
                id="date"
                name="date"
                defaultValue={blog?.date ? new Date(blog.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors"
              />
            </div>

            <div className="pt-2">
              <label className="relative flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  id="isActive" 
                  name="isActive" 
                  defaultChecked={isEditing ? blog?.isActive : true} 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                <span className="ml-3 text-sm font-medium text-slate-700">Published</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Full Width: Content Editor */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-semibold text-navy-900 border-b border-slate-100 pb-2">Article Content</h3>
        <div className="prose-editor min-h-[400px]">
          <ReactQuill 
            theme="snow" 
            value={content} 
            onChange={setContent} 
            modules={modules}
            formats={formats}
            className="h-[350px] mb-12"
          />
        </div>
      </div>

      <div className="sticky bottom-0 bg-white/80 backdrop-blur-md p-4 border-t border-slate-200 flex justify-end gap-3 rounded-b-xl -mx-6 -mb-6 mt-8">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium flex items-center transition-colors disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            isEditing ? 'Update Post' : 'Create Post'
          )}
        </button>
      </div>
    </form>
  );
}
