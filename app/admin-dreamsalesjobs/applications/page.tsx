import connectDB from '@/lib/mongodb';
import Application from '@/lib/models/Application';
import { ApplicationsClient } from '@/components/admin/ApplicationsClient';

export const metadata = {
  title: 'Manage Applications | CMS Admin',
};

export default async function ApplicationsPage() {
  await connectDB();
  
  const applications = await Application.find().sort({ createdAt: -1 }).lean();

  const serialized = applications.map(app => ({
    ...app,
    _id: app._id.toString(),
    createdAt: (app as any).createdAt?.toISOString(),
    updatedAt: (app as any).updatedAt?.toISOString(),
  }));

  return (
    <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Job Applications</h1>
            <p className="text-slate-600 mt-2">Review CV submissions from the apply form and job portal.</p>
          </div>
        </header>
        
        <ApplicationsClient initialApplications={serialized} />
      </div>
    </main>
  );
}
