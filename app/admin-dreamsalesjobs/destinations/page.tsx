import { DestinationsClient } from '@/components/admin/DestinationsClient';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Manage Destinations | CMS Admin',
};

export const revalidate = 0; // Don't cache admin pages

export default async function DestinationsAdminPage() {
  // Fetch destinations (both active and inactive)
  const destinations = await prisma.destination.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const serialized = destinations.map(dest => ({
    ...dest,
    _id: dest.id,
    createdAt: dest.createdAt?.toISOString(),
    updatedAt: dest.updatedAt?.toISOString(),
  }));

  return (
    <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
      <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Master Data Destinations</h1>
            <p className="text-slate-600 mt-2">Manage locations available for job postings.</p>
          </div>
        </header>
        
        <DestinationsClient 
          initialDestinations={serialized} 
        />
      </div>
    </main>
  );
}