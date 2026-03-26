import { Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-navy-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="block">
              <Image 
                src="/images/logo-utama.webp" 
                alt="Dream Sales Jobs" 
                title="Dream Sales Jobs"
                width={180} 
                height={40} 
                className="h-10 w-auto object-contain bg-white rounded-md p-1"
              />
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Specialist recruitment for Australians, Kiwis & Brits ready to trade the 9–5 for luxury resort careers in Bali, Vietnam & Thailand.
            </p>
            <div className="flex gap-4 pt-2">
              <Link href="https://twitter.com/dreamsalesjobs" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary-500 transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://www.linkedin.com/company/dreamsalesjobs" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary-500 transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-primary-500 transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-primary-500 transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/jobs" className="hover:text-primary-500 transition-colors">Browse Jobs</Link></li>
              <li><Link href="/destinations" className="hover:text-primary-500 transition-colors">Destinations</Link></li>
              <li><Link href="/destinations/indonesia" className="hover:text-primary-500 transition-colors">Indonesia</Link></li>
              <li><Link href="/blog" className="hover:text-primary-500 transition-colors">Career Blog</Link></li>
              <li><Link href="/about" className="hover:text-primary-500 transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* For Candidates & Employers */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/candidates" className="hover:text-primary-500 transition-colors">For Candidates</Link></li>
              <li><Link href="/employers" className="hover:text-primary-500 transition-colors">For Employers</Link></li>
              <li><Link href="/apply" className="hover:text-primary-500 transition-colors">Submit CV</Link></li>
              <li><Link href="/hire" className="hover:text-primary-500 transition-colors">Hire Talent</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-primary-500 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary-500 transition-colors">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-primary-500 transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Dream Sales Jobs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
