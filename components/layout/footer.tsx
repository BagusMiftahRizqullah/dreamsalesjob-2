import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-navy-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white tracking-tight">Dream Sales Jobs</h3>
            <p className="text-sm leading-relaxed max-w-xs">
              Specialist recruitment for Australians, Kiwis & Brits ready to trade the 9–5 for luxury resort careers in Bali, Vietnam & Thailand.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/jobs" className="hover:text-primary-500 transition-colors">Browse Jobs</Link></li>
              <li><Link href="/destinations" className="hover:text-primary-500 transition-colors">Destinations</Link></li>
              <li><Link href="/guides" className="hover:text-primary-500 transition-colors">Career Guides</Link></li>
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
