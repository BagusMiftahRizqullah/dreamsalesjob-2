'use client';

import { useState, useEffect, useCallback } from 'react';
import { Loader2, UploadCloud, X, Image as ImageIcon, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { createDestination, updateDestination } from '@/app/admin-dreamsalesjobs/destinations/actions';

interface DestinationFormProps {
  destination?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function DestinationForm({ destination, onSuccess, onCancel }: DestinationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!destination;

  // Media Library States
  const [featuredImage, setFeaturedImage] = useState(destination?.image || '/images/place/default.webp');
  const [featuredImageProgress, setFeaturedImageProgress] = useState<number | null>(null);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [mediaActiveTab, setMediaActiveTab] = useState<'upload' | 'library'>('upload');
  const [libraryImages, setLibraryImages] = useState<any[]>([]);
  const [isLoadingLibrary, setIsLoadingLibrary] = useState(false);
  const [isDeletingImage, setIsDeletingImage] = useState<string | null>(null);

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
      formData.append('slug', slugInput?.value || 'destination');

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
        console.error('Error uploading image:', error);
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
        if (url) {
          setFeaturedImage(url);
          setIsMediaModalOpen(false);
        }
      });
    }
  };


  async function handleSubmit(formData: FormData) {
    formData.set('image', featuredImage);
    setIsSubmitting(true);
    try {
      if (isEditing) {
        await updateDestination(destination._id.toString(), formData);
      } else {
        await createDestination(formData);
      }
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      alert('An error occurred while saving the destination.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-navy-900">
            {isEditing ? 'Edit Destination' : 'Add New Destination'}
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            {isEditing ? 'Update destination master data.' : 'Create a new destination for jobs.'}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-lg font-semibold text-navy-900 border-b border-slate-100 pb-2">Basic Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-slate-700">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={destination?.name}
              required
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="slug" className="text-sm font-medium text-slate-700">Slug *</label>
            <input
              type="text"
              id="slug"
              name="slug"
              defaultValue={destination?.slug}
              required
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="description" className="text-sm font-medium text-slate-700">Description *</label>
            <textarea
              id="description"
              name="description"
              defaultValue={destination?.description}
              required
              rows={3}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all resize-y"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Image *</label>
            <div 
              className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg ${featuredImageProgress !== null ? 'border-primary-500 bg-primary-50' : 'border-slate-300 hover:border-primary-400'} cursor-pointer`}
              onClick={() => setIsMediaModalOpen(true)}
            >
              <div className="space-y-1 text-center w-full">
                {featuredImage ? (
                  <div className="relative inline-block w-full">
                    <div className="relative h-48 w-full aspect-video rounded-lg overflow-hidden mb-4">
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
            <input type="hidden" name="image" value={featuredImage || '/images/place/default.webp'} />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="relative flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="isActive"
                defaultChecked={destination ? destination.isActive : true}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              <span className="ml-3 text-sm font-medium text-slate-700">Is Active</span>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-lg font-semibold text-navy-900 border-b border-slate-100 pb-2">Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label htmlFor="stats.averageEarnings" className="text-sm font-medium text-slate-700">Average Earnings</label>
            <input
              type="text"
              id="stats.averageEarnings"
              name="stats.averageEarnings"
              defaultValue={destination?.stats?.averageEarnings}
              placeholder="e.g., $80k - $150k"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="stats.costOfLiving" className="text-sm font-medium text-slate-700">Cost of Living</label>
            <input
              type="text"
              id="stats.costOfLiving"
              name="stats.costOfLiving"
              defaultValue={destination?.stats?.costOfLiving}
              placeholder="e.g., Low ($2k/mo)"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="stats.visaType" className="text-sm font-medium text-slate-700">Visa Type</label>
            <input
              type="text"
              id="stats.visaType"
              name="stats.visaType"
              defaultValue={destination?.stats?.visaType}
              placeholder="e.g., B211A / KITAS"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="pt-4 pb-8 flex justify-end gap-3 sticky bottom-0 bg-slate-50/80 backdrop-blur-sm z-10 px-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 border border-slate-200 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors font-medium min-w-[140px]"
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </span>
          ) : (
            'Save Destination'
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
                                if (url) {
                                  setFeaturedImage(url);
                                  setIsMediaModalOpen(false);
                                }
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
                          onClick={() => {
                            setFeaturedImage(img.url);
                            setIsMediaModalOpen(false);
                          }}
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
