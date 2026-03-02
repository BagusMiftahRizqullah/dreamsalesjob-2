'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { hireSchema } from '@/lib/schemas';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useState } from 'react';

type HireFormValues = z.infer<typeof hireSchema>;

export default function HirePage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<HireFormValues>({
    resolver: zodResolver(hireSchema),
  });

  const onSubmit = async (data: HireFormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Form data:', data);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-slate-50 py-12 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-navy-900 mb-2">Inquiry Sent!</h1>
            <p className="text-slate-600 mb-6">
              Thank you for your interest. Our business development team will be in touch shortly to discuss your hiring needs.
            </p>
            <Button onClick={() => window.location.href = '/'} className="w-full">
              Back to Home
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
                Hire Top Sales Talent
              </h1>
              <p className="mt-4 text-lg text-slate-600">
                Connect with pre-vetted sales professionals ready to relocate to your office in Asia.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    placeholder="Acme Corp"
                    {...register('companyName')}
                    className={errors.companyName ? 'border-red-500' : ''}
                  />
                  {errors.companyName && (
                    <p className="text-sm text-red-500">{errors.companyName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Name</Label>
                  <Input
                    id="contactName"
                    placeholder="Jane Smith"
                    {...register('contactName')}
                    className={errors.contactName ? 'border-red-500' : ''}
                  />
                  {errors.contactName && (
                    <p className="text-sm text-red-500">{errors.contactName.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Work Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane@acmecorp.com"
                      {...register('email')}
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Company Website</Label>
                    <Input
                      id="website"
                      placeholder="https://acmecorp.com"
                      {...register('website')}
                      className={errors.website ? 'border-red-500' : ''}
                    />
                    {errors.website && (
                      <p className="text-sm text-red-500">{errors.website.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Office Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g. Canggu, Bali"
                    {...register('location')}
                    className={errors.location ? 'border-red-500' : ''}
                  />
                  {errors.location && (
                    <p className="text-sm text-red-500">{errors.location.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rolesToFill">Roles to Fill</Label>
                  <Textarea
                    id="rolesToFill"
                    placeholder="Describe the roles you are hiring for (e.g. 2x SDRs, 1x Closer)..."
                    className={errors.rolesToFill ? 'border-red-500 min-h-[120px]' : 'min-h-[120px]'}
                    {...register('rolesToFill')}
                  />
                  {errors.rolesToFill && (
                    <p className="text-sm text-red-500">{errors.rolesToFill.message}</p>
                  )}
                </div>

                <div className="pt-4">
                  <Button type="submit" size="lg" className="w-full bg-navy-900 hover:bg-navy-800 text-white font-bold" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Request Consultation'}
                    {isSubmitting ? null : <ArrowRight className="ml-2 h-5 w-5" />}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
