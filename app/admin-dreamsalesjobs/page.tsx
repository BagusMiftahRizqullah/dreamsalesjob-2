import { Briefcase, FileText, Activity, MapPin, Users } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'CMS Admin | Dream Sales Jobs',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminDashboard() {
  const cards = [
    { title: 'Jobs', icon: Briefcase, count: 'Manage active jobs', href: '/admin-dreamsalesjobs/jobs', color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Destinations', icon: MapPin, count: 'Master data locations', href: '/admin-dreamsalesjobs/destinations', color: 'text-purple-600', bg: 'bg-purple-100' },
    { title: 'CV Submissions', icon: Users, count: 'Review job applications', href: '/admin-dreamsalesjobs/applications', color: 'text-orange-600', bg: 'bg-orange-100' },
    { title: 'Blogs', icon: FileText, count: 'Manage blog posts', href: '/admin-dreamsalesjobs/blogs', color: 'text-green-600', bg: 'bg-green-100' },
  ];

  return (
    <main className="p-4 md:p-8 space-y-6 md:space-y-8 flex-1 w-full overflow-y-auto">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Dashboard Overview</h1>
          <p className="text-slate-500 mt-1">Welcome back to the Dream Sales Jobs CMS.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {cards.map((card) => (
          <Link key={card.title} href={card.href} className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow hover:border-primary-200 group flex flex-col justify-center">
            <div className="flex items-center gap-3 md:gap-4">
              <div className={`h-10 w-10 md:h-12 md:w-12 shrink-0 rounded-full flex items-center justify-center ${card.bg} ${card.color} group-hover:scale-110 transition-transform`}>
                <card.icon className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-base md:text-lg text-slate-800 group-hover:text-primary-600 transition-colors truncate" title={card.title}>{card.title}</h3>
                <p className="text-xs md:text-sm text-slate-500 truncate" title={card.count}>{card.count}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-navy-900 mb-4">Recent Activity</h2>
        <div className="text-center py-16 text-slate-500 border-2 border-dashed border-slate-100 rounded-lg bg-slate-50/50">
          No recent activity to display.
        </div>
      </div>
    </main>
  );
}
