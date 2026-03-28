'use client';

import { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { createBlog, updateBlog } from '@/app/admin-dreamsalesjobs/blogs/actions';
import { Loader2, Eye, UploadCloud, X, Image as ImageIcon, Trash2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import 'react-quill/dist/quill.snow.css';

// Dynamically import react-quill to avoid SSR issues
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    return function Comp({ forwardedRef, ...props }: any) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  { 
    ssr: false,
    loading: () => <div className="h-64 w-full bg-slate-50 border border-slate-200 rounded-lg animate-pulse flex items-center justify-center text-slate-400">Loading Editor...</div>
  }
);

interface BlogFormProps {
  blog?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video',
  'align'
];

export function BlogForm({ blog, onSuccess, onCancel }: BlogFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [content, setContent] = useState(blog?.content || '');
  const [featuredImage, setFeaturedImage] = useState(blog?.image || '');
  const [featuredImageProgress, setFeaturedImageProgress] = useState<number | null>(null);
  
  // Media Library States
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [mediaActiveTab, setMediaActiveTab] = useState<'upload' | 'library'>('upload');
  const [libraryImages, setLibraryImages] = useState<any[]>([]);
  const [isLoadingLibrary, setIsLoadingLibrary] = useState(false);
  const [isDeletingImage, setIsDeletingImage] = useState<string | null>(null);
  const [mediaTarget, setMediaTarget] = useState<'featured' | 'editor'>('featured');

  const formRef = useRef<HTMLFormElement>(null);
  const quillRef = useRef<any>(null);

  const isEditing = !!blog;

  // Fetch images for media library
  const fetchLibraryImages = async () => {
    setIsLoadingLibrary(true);
    try {
      const res = await fetch('/api/images');
      if (res.ok) {
        const data = await res.json();
        setLibraryImages(data.images || []);
      }
    } catch (err) {
      console.error('Failed to fetch library images', err);
    } finally {
      setIsLoadingLibrary(false);
    }
  };

  const handleDeleteImage = async (e: React.MouseEvent, url: string, name: string) => {
    e.stopPropagation();
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) {
      return;
    }

    setIsDeletingImage(url);
    try {
      const res = await fetch(`/api/images?url=${encodeURIComponent(url)}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        setLibraryImages(prev => prev.filter(img => img.url !== url));
        if (featuredImage === url) {
          setFeaturedImage('');
        }
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete image');
      }
    } catch (err) {
      console.error('Failed to delete image', err);
      alert('Failed to delete image');
    } finally {
      setIsDeletingImage(null);
    }
  };

  useEffect(() => {
    if (isMediaModalOpen && mediaActiveTab === 'library') {
      fetchLibraryImages();
    }
  }, [isMediaModalOpen, mediaActiveTab]);

  const openMediaModal = useCallback((target: 'featured' | 'editor') => {
    setMediaTarget(target);
    setIsMediaModalOpen(true);
  }, []);

  const handleImageSelect = useCallback((url: string) => {
    if (mediaTarget === 'featured') {
      setFeaturedImage(url);
    } else if (mediaTarget === 'editor') {
      const quill = quillRef.current?.getEditor();
      if (quill) {
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, 'image', url);
        quill.setSelection(range.index + 1);
      }
    }
    setIsMediaModalOpen(false);
  }, [mediaTarget]);

  const imageHandler = useCallback(() => {
    openMediaModal('editor');
  }, [openMediaModal]);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'align': []}],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), [imageHandler]);

  const handleFeaturedImageUpload = (file: File): Promise<string | void> => {
    return new Promise((resolve, reject) => {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2MB limit.');
        resolve();
        return;
      }

      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Invalid file format. Only JPG, PNG, GIF, and WEBP are allowed.');
        resolve();
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      const slugInput = document.getElementById('slug') as HTMLInputElement;
      formData.append('slug', slugInput?.value || 'featured');

      try {
        setFeaturedImageProgress(0);
        
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/upload/image', true);
        
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentComplete = Math.round((event.loaded / event.total) * 100);
            setFeaturedImageProgress(percentComplete);
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            setFeaturedImage(response.url);
            resolve(response.url);
          } else {
            const response = JSON.parse(xhr.responseText);
            alert(response.error || 'Upload failed');
            resolve();
          }
          setFeaturedImageProgress(null);
        };

        xhr.onerror = () => {
          alert('Upload failed due to network error');
          setFeaturedImageProgress(null);
          resolve();
        };

        xhr.send(formData);
      } catch (error) {
        console.error('Error uploading featured image:', error);
        alert('Upload failed');
        setFeaturedImageProgress(null);
        resolve();
      }
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFeaturedImageUpload(files[0]).then((url: any) => {
        if (url) handleImageSelect(url);
      });
    }
  };

  const handlePreview = () => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    
    const previewData = {
      title: formData.get('title') || 'Untitled Preview',
      slug: formData.get('slug') || 'preview-slug',
      excerpt: formData.get('excerpt') || '',
      content: content,
      image: featuredImage,
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
    formData.set('content', content);
    formData.set('image', featuredImage);

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
              <label className="block text-sm font-medium text-slate-700 mb-1">Featured Image</label>
              
              <div 
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg ${featuredImageProgress !== null ? 'border-primary-500 bg-primary-50' : 'border-slate-300 hover:border-primary-400'} cursor-pointer`}
                onClick={() => openMediaModal('featured')}
              >
                <div className="space-y-1 text-center w-full">
                  {featuredImage ? (
                    <div className="relative inline-block w-full">
                      <div className="relative h-32 w-full aspect-video rounded-lg overflow-hidden mb-4">
                        <Image 
                          src={featuredImage} 
                          alt="Preview" 
                          fill 
                          className="object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFeaturedImage('');
                        }}
                        className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <UploadCloud className="mx-auto h-12 w-12 text-slate-400" />
                  )}
                  
                  {featuredImageProgress !== null ? (
                    <div className="w-full max-w-xs mx-auto">
                      <div className="flex justify-between text-xs text-primary-600 mb-1">
                        <span>Uploading...</span>
                        <span>{featuredImageProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5">
                        <div 
                          className="bg-primary-600 h-1.5 rounded-full transition-all duration-300" 
                          style={{ width: `${featuredImageProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex text-sm text-slate-600 justify-center">
                      <span className="relative rounded-md font-medium text-primary-600 hover:text-primary-500">
                        Select or Upload Image
                      </span>
                    </div>
                  )}
                  <p className="text-xs text-slate-500">
                    PNG, JPG, GIF, WEBP up to 2MB
                  </p>
                </div>
              </div>
              <input type="hidden" name="image" value={featuredImage || '/blog/cover.webp'} />
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
          {/* @ts-ignore - dynamic import ref type issue */}
          <ReactQuill 
            forwardedRef={quillRef}
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

      {/* Media Library Modal */}
      {isMediaModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <ImageIcon className="w-6 h-6 text-primary-600" />
                Media Library
              </h3>
              <button
                type="button"
                onClick={() => setIsMediaModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex border-b border-slate-200">
              <button
                type="button"
                className={`flex-1 py-3 text-sm font-medium transition-colors ${mediaActiveTab === 'upload' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-slate-500 hover:text-slate-700'}`}
                onClick={() => setMediaActiveTab('upload')}
              >
                Upload New Image
              </button>
              <button
                type="button"
                className={`flex-1 py-3 text-sm font-medium transition-colors ${mediaActiveTab === 'library' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-slate-500 hover:text-slate-700'}`}
                onClick={() => setMediaActiveTab('library')}
              >
                Media Library
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50">
              {mediaActiveTab === 'upload' ? (
                <div 
                  className="flex justify-center items-center h-64 px-6 pt-5 pb-6 border-2 border-dashed rounded-xl border-slate-300 hover:border-primary-400 bg-white"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="space-y-2 text-center">
                    <UploadCloud className="mx-auto h-12 w-12 text-slate-400" />
                    <div className="flex text-sm text-slate-600 justify-center">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none">
                        <span>Upload a file</span>
                        <input 
                          type="file" 
                          className="sr-only" 
                          accept="image/png, image/jpeg, image/gif, image/webp"
                          onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                              handleFeaturedImageUpload(e.target.files[0]).then((url: any) => {
                                if (url) handleImageSelect(url);
                              });
                            }
                          }}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-slate-500">
                      PNG, JPG, GIF, WEBP up to 2MB
                    </p>
                    {featuredImageProgress !== null && (
                      <div className="w-full max-w-xs mx-auto mt-4">
                        <div className="flex justify-between text-xs text-primary-600 mb-1">
                          <span>Uploading...</span>
                          <span>{featuredImageProgress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5">
                          <div 
                            className="bg-primary-600 h-1.5 rounded-full transition-all duration-300" 
                            style={{ width: `${featuredImageProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="h-full min-h-[300px]">
                  {isLoadingLibrary ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-3">
                      <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
                      <p>Loading images...</p>
                    </div>
                  ) : libraryImages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-3 bg-white rounded-xl border border-slate-200 border-dashed py-12">
                      <ImageIcon className="w-12 h-12 text-slate-300" />
                      <p>No images found in library.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {libraryImages.map((img) => (
                        <div 
                          key={img.name}
                          onClick={() => handleImageSelect(img.url)}
                          className="group relative aspect-square rounded-xl overflow-hidden border border-slate-200 bg-white cursor-pointer hover:ring-2 hover:ring-primary-500 hover:border-transparent transition-all"
                        >
                          <Image
                            src={img.url}
                            alt={img.name}
                            fill
                            className={`object-cover transition-transform duration-300 ${isDeletingImage === img.url ? 'opacity-50' : 'group-hover:scale-105'}`}
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                            <p className="text-white text-xs truncate" title={img.name}>{img.name}</p>
                          </div>
                          
                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={(e) => handleDeleteImage(e, img.url, img.name)}
                            disabled={isDeletingImage === img.url}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 disabled:bg-slate-400"
                            title="Delete Image"
                          >
                            {isDeletingImage === img.url ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
