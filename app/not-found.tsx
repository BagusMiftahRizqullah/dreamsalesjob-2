import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[70vh] bg-slate-50 flex flex-col items-center justify-center py-20 px-4">
        <div className="text-center max-w-lg mx-auto space-y-6">
          <h1 className="text-8xl font-bold text-navy-900 tracking-tighter">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
            Page Not Found
          </h2>
          <p className="text-slate-600 text-lg">
            Oops! The page you are looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="pt-6">
            <Link href="/">
              <Button size="lg" className="bg-primary-600 hover:bg-primary-700 text-white font-semibold h-14 px-8 shadow-lg shadow-primary-600/20">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
