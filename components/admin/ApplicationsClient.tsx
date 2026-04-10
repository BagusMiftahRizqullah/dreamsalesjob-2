'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, Eye, Trash2, X, Download, Loader2 } from 'lucide-react';
import { updateApplicationStatus, deleteApplication } from '@/app/admin-dreamsalesjobs/applications/actions';
import { Pagination } from './Pagination';
import { formatDate } from '@/lib/utils';

interface ApplicationsClientProps {
  initialApplications: any[];
}

export function ApplicationsClient({ initialApplications }: ApplicationsClientProps) {
  const [applications, setApplications] = useState(initialApplications);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<string | null>(null);
  const itemsPerPage = 10;

  const filteredApps = useMemo(() => {
    return applications.filter((app) => 
      app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.jobSlug?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [applications, searchQuery]);

  // Reset page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredApps.length / itemsPerPage);
  const paginatedApps = filteredApps.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setIsUpdatingStatus(id);
    try {
      await updateApplicationStatus(id, newStatus);
      setApplications(applications.map(app => 
        app._id === id ? { ...app, status: newStatus } : app
      ));
      if (selectedApp?._id === id) {
        setSelectedApp({ ...selectedApp, status: newStatus });
      }
    } catch (error) {
      alert('Failed to update status');
    } finally {
      setIsUpdatingStatus(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      setIsDeleting(id);
      try {
        await deleteApplication(id);
        setApplications(applications.filter(a => a._id !== id));
        if (selectedApp?._id === id) {
          setSelectedApp(null);
        }
      } catch (error) {
        alert('Failed to delete application');
      } finally {
        setIsDeleting(null);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'reviewed': return 'bg-yellow-100 text-yellow-800';
      case 'contacted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">All Submissions</h2>
          <p className="text-slate-500 text-sm mt-1">{applications.length} total applications</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search applicants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 w-full border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="overflow-auto max-h-[calc(100vh-200px)] relative">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead className="sticky top-0 z-10 bg-slate-50 shadow-sm ring-1 ring-slate-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Applicant</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Target Role/Dest.</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Date Applied</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {paginatedApps.map((app) => (
              <tr key={app._id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">{app.fullName}</div>
                  <div className="text-sm text-slate-500">{app.email}</div>
                  <div className="text-sm text-slate-500">{app.phone}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-slate-900">
                    {app.jobTitle || app.jobSlug || 'General Application'}
                  </div>
                  <div className="text-sm text-slate-500 capitalize">{app.destination}</div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {formatDate(app.createdAt)}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app._id, e.target.value)}
                    className={`text-xs font-medium px-2.5 py-1 rounded-full border-none focus:ring-2 focus:ring-primary-500 cursor-pointer ${getStatusColor(app.status)}`}
                  >
                    <option value="new">New</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="contacted">Contacted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setSelectedApp(app)}
                      className="p-2 text-slate-400 hover:text-primary-600 transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(app._id)}
                      disabled={isDeleting === app._id}
                      className="p-2 text-slate-400 hover:text-red-600 transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      {isDeleting === app._id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {paginatedApps.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  No applications found.
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
        totalItems={filteredApps.length}
        itemsPerPage={itemsPerPage}
      />

      {/* Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-center z-10">
              <h3 className="text-xl font-bold text-slate-800">Application Details</h3>
              <button 
                onClick={() => setSelectedApp(null)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Applicant Name</h4>
                  <p className="font-medium text-slate-900">{selectedApp.fullName}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Date Applied</h4>
                  <p className="font-medium text-slate-900">{formatDate(selectedApp.createdAt)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Email Address</h4>
                  <a href={`mailto:${selectedApp.email}`} className="font-medium text-primary-600 hover:underline">{selectedApp.email}</a>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Phone Number</h4>
                  <a href={`tel:${selectedApp.phone}`} className="font-medium text-primary-600 hover:underline">{selectedApp.phone}</a>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Application Info</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <span className="block text-sm text-slate-500 mb-1">Target Role</span>
                    <span className="font-medium text-slate-900">{selectedApp.jobTitle || selectedApp.jobSlug || 'General Application'}</span>
                  </div>
                  <div>
                    <span className="block text-sm text-slate-500 mb-1">Preferred Destination</span>
                    <span className="font-medium text-slate-900 capitalize">{selectedApp.destination}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="block text-sm text-slate-500 mb-1">LinkedIn Profile</span>
                    {selectedApp.linkedin ? (
                      <a href={selectedApp.linkedin} target="_blank" rel="noopener noreferrer" className="font-medium text-primary-600 hover:underline">
                        {selectedApp.linkedin}
                      </a>
                    ) : (
                      <span className="text-slate-400 italic">Not provided</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Sales Experience</h4>
                <div className="bg-slate-50 p-4 rounded-lg text-slate-700 whitespace-pre-wrap">
                  {selectedApp.experience}
                </div>
              </div>

            </div>
            
            <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 p-6 flex justify-between items-center z-10">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-600">Status:</span>
                <select
                  value={selectedApp.status}
                  onChange={(e) => handleStatusChange(selectedApp._id, e.target.value)}
                  className={`text-sm font-medium px-3 py-1.5 rounded-full border-none focus:ring-2 focus:ring-primary-500 cursor-pointer ${getStatusColor(selectedApp.status)}`}
                >
                  <option value="new">New</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="contacted">Contacted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              
              <button
                onClick={() => {
                  alert('CV Document download feature would be implemented here based on your cloud storage setup (e.g. S3/R2).');
                }}
                className="inline-flex items-center px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium shadow-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
