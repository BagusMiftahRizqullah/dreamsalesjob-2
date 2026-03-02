import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Dream Sales Jobs',
  description: 'Terms of Service for Dream Sales Jobs.',
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <h1 className="text-3xl font-bold text-navy-900 mb-6">Terms of Service</h1>
            <div className="prose prose-slate max-w-none">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
              
              <h2>1. Agreement to Terms</h2>
              <p>
                By accessing or using our website, you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
              </p>

              <h2>2. Use of Our Service</h2>
              <p>
                Dream Sales Jobs provides a recruitment platform connecting job seekers with employers.
                You agree to use the Service only for lawful purposes and in accordance with these Terms.
              </p>

              <h2>3. User Accounts</h2>
              <p>
                When you create an account with us, you must provide us information that is accurate, complete, and current at all times.
                Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
              </p>

              <h2>4. Content</h2>
              <p>
                Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material (&quot;Content&quot;).
                You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.
              </p>

              <h2>5. Termination</h2>
              <p>
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>

              <h2>6. Limitation of Liability</h2>
              <p>
                In no event shall Dream Sales Jobs, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
              </p>

              <h2>7. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
              </p>

              <h2>8. Changes</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
