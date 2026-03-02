import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us | Dream Sales Jobs',
  description: 'We connect top sales talent with the best employers in Southeast Asia.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl mb-8">
              About Dream Sales Jobs
            </h1>
            
            <div className="prose prose-lg prose-slate max-w-none">
              <p>
                We started Dream Sales Jobs with a simple mission: to help talented sales professionals escape the rat race and build a career in paradise.
              </p>
              <p>
                As former sales leaders who made the move ourselves, we know exactly what it takes to succeed in Southeast Asia. We've navigated the visas, the housing markets, and the job landscape so you don't have to.
              </p>
              
              <h2>Our Promise</h2>
              <ul>
                <li><strong>Verification:</strong> We personally visit every employer office.</li>
                <li><strong>Transparency:</strong> No hidden fees. OTEs are realistic and verified.</li>
                <li><strong>Support:</strong> We guide you through the relocation process from start to finish.</li>
              </ul>

              <h2>Why We Do It</h2>
              <p>
                Sales is a high-pressure career. We believe you should be rewarded not just with money, but with lifestyle. Why grind in a grey city when you could be closing deals by the pool in Bali?
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1632"
                    alt="Team meeting"
                    fill
                    className="object-cover"
                  />
               </div>
               <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1470"
                    alt="Working together"
                    fill
                    className="object-cover"
                  />
               </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
