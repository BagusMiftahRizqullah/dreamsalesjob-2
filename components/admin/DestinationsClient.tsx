'use client';

import { useState, useMemo } from 'react';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { DestinationForm } from './DestinationForm';
import { Pagination } from './Pagination';
import { deleteDestination } from '@/app/admin-dreamsalesjobs/destinations/actions';

interface DestinationsClientProps {
  initialDestinations: any[];
}

export function DestinationsClient({ initialDestinations }: DestinationsClientProps) {
  const [destinations, setDestinations] = useState(initialDestinations);
  const [isAdding, setIsAdding] = useState(false);
  const [editingDest, setEditingDest] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => 
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [destinations, searchQuery]);

  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);
  const paginatedDestinations = filteredDestinations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this destination?')) {
      try {
        await deleteDestination(id);
        setDestinations(destinations.filter(d => d._id.toString() !== id));
      } catch (error) {
        alert('Failed to delete destination');
      }
    }
  };

  if (isAdding || editingDest) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <DestinationForm
          destination={editingDest}
          onSuccess={() => {
            setIsAdding(false);
            setEditingDest(null);
            // In a real app we might want to refresh the page or update state here
            // Next.js server actions with revalidatePath will handle the refresh
            window.location.reload();
          }}
          onCancel={() => {
            setIsAdding(false);
            setEditingDest(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Destinations</h2>
          <p className="text-slate-500 text-sm mt-1">Manage destination master data</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search destinations..."
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
            Add Destination
          </button>
        </div>
      </div>

      <div className="overflow-auto max-h-[calc(100vh-200px)] relative">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead className="sticky top-0 z-10 bg-slate-50 shadow-sm ring-1 ring-slate-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Name / Slug</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Description</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {paginatedDestinations.map((dest) => (
              <tr key={dest._id.toString()} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">{dest.name}</div>
                  <div className="text-sm text-slate-500">{dest.slug}</div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-600 line-clamp-2 max-w-md">{dest.description}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    dest.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-slate-100 text-slate-800'
                  }`}>
                    {dest.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingDest(dest)}
                      className="p-2 text-slate-400 hover:text-primary-600 transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(dest._id.toString())}
                      className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {paginatedDestinations.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                  No destinations found matching your search.
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
        totalItems={filteredDestinations.length}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}