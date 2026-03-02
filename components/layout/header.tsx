'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Jobs', href: '/jobs' },
    { label: 'Destinations', href: '/destinations' },
    { label: 'Candidates', href: '/candidates' },
    { label: 'Employers', href: '/employers' },
    { label: 'Guides', href: '/guides' },
    { label: 'About', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-navy-900 tracking-tight">Dream Sales Jobs</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" className="hidden lg:flex">
            Log In
          </Button>
          <Link href="/apply">
            <Button className="bg-secondary-500 hover:bg-secondary-600 text-white font-semibold shadow-lg shadow-secondary-500/20">
              Submit CV
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white p-4 shadow-lg absolute w-full left-0 top-16 z-40">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-medium text-slate-600 hover:text-primary-600 py-2 border-b border-slate-50 last:border-0"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-slate-100">
              <Link href="/apply" onClick={() => setIsOpen(false)} className="w-full">
                <Button className="w-full bg-secondary-500 hover:bg-secondary-600">
                  Submit CV
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
