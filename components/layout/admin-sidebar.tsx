'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Briefcase, FileText, MapPin, LogOut, Menu, X, Users } from 'lucide-react';
import { logout } from '@/app/admin-dreamsalesjobs/login/actions';

export function AdminSidebar() {
  const pathname = usePathname();
  const [isContentOpen, setIsContentOpen] = useState(pathname.startsWith('/admin-dreamsalesjobs/content'));
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Don't render sidebar on login page
  if (pathname === '/admin-dreamsalesjobs/login') {
    return null;
  }

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
      {/* Mobile Header (Visible only on small screens) */}
      <div className="md:hidden flex items-center justify-between bg-white border-b border-slate-200 p-4 sticky top-0 z-40">
        <Link href="/admin-dreamsalesjobs" className="flex items-center gap-2">
          <Image 
            src="/images/logo-utama.png" 
            alt="Dream Sales Jobs" 
            title="Dream Sales Jobs"
            width={120} 
            height={30} 
            className="h-6 w-auto object-contain"
            priority
          />
        </Link>
        <button onClick={toggleMobile} className="p-2 text-slate-600 hover:bg-slate-100 rounded-md">
          {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 z-50
        h-screen w-64 bg-white border-r border-slate-200 
        flex flex-col transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Logo Area */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <Link href="/admin-dreamsalesjobs" className="flex items-center gap-2">
            <Image 
              src="/images/logo-utama.png" 
              alt="Dream Sales Jobs" 
              title="Dream Sales Jobs"
              width={140} 
              height={35} 
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {[
            { name: 'Dashboard', href: '/admin-dreamsalesjobs', icon: LayoutDashboard, exact: true },
            { name: 'Jobs', href: '/admin-dreamsalesjobs/jobs', icon: Briefcase },
            { name: 'Destinations', href: '/admin-dreamsalesjobs/destinations', icon: MapPin },
            { name: 'CV Submissions', href: '/admin-dreamsalesjobs/applications', icon: Users },
            { name: 'Manage Blogs', href: '/admin-dreamsalesjobs/blogs', icon: FileText },
          ].map((item) => {
            const isActive = item.exact 
              ? pathname === item.href 
              : pathname.startsWith(item.href);
              
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ease-out overflow-hidden ${
                  isActive 
                    ? 'text-primary-700 bg-primary-50/80 shadow-sm shadow-primary-100/50' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-navy-900 hover:translate-x-1'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-primary-500 rounded-r-full" />
                )}
                <item.icon className={`w-5 h-5 transition-transform duration-200 ${
                  isActive 
                    ? 'text-primary-600 scale-110' 
                    : 'text-slate-400 group-hover:text-primary-500 group-hover:scale-110'
                }`} />
                <span className="relative z-10">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile & Logout Bottom Area */}
        <div className="p-4 m-4 border border-slate-100 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary-100 to-primary-200 flex items-center justify-center border border-primary-200 shadow-inner flex-shrink-0 transition-transform hover:scale-105">
              <span className="text-sm font-bold text-primary-700">A</span>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-navy-900 truncate">Administrator</p>
              <p className="text-xs text-slate-500 truncate">admin@dreamsalesjobs.com</p>
            </div>
          </div>
          <form action={logout}>
            <button type="submit" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium group">
              <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Sign out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
