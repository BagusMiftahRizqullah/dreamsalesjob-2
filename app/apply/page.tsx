'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { applySchema } from '@/lib/schemas';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { submitApplication } from '@/app/apply/actions';

type ApplyFormValues = z.infer<typeof applySchema>;

function ApplyForm() {
  const searchParams = useSearchParams();
  const jobSlug = searchParams.get('job');
  const jobTitle = searchParams.get('title');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<ApplyFormValues>({
    resolver: zodResolver(applySchema),
    defaultValues: {
      destination: 'salesjobsbali', // Default to Bali if no job selected
    },
  });

  const onSubmit = async (data: ApplyFormValues) => {
    const result = await submitApplication({
      ...data,
      jobSlug: jobSlug || '',
      jobTitle: jobTitle || '',
    });
    
    if (result.success) {
      setIsSubmitted(true);
    } else {
      alert('Failed to submit application. Please try again.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center mx-auto">
        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-navy-900 mb-2">Application Received!</h1>
        <p className="text-slate-600 mb-6">
          Thanks for applying. Our team will review your profile and get back to you within 48 hours.
        </p>
        <Button onClick={() => window.location.href = '/jobs'} className="w-full">
          Browse More Jobs
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
          Start Your Journey
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Apply once to be considered for all open roles in Bali, Thailand & Vietnam.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {jobTitle && (
            <div className="space-y-2 mb-6 p-4 bg-primary-50 rounded-lg border border-primary-100">
              <Label className="text-primary-700 font-semibold">Applying for Role</Label>
              <div className="text-lg font-medium text-navy-900">{jobTitle}</div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              {...register('fullName')}
              className={errors.fullName ? 'border-red-500' : ''}
            />
            {errors.fullName && (
              <p className="text-sm text-red-500">{errors.fullName.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register('email')}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+61 400 000 000"
                {...register('phone')}
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn Profile (Optional)</Label>
            <Input
              id="linkedin"
              placeholder="https://linkedin.com/in/johndoe"
              {...register('linkedin')}
              className={errors.linkedin ? 'border-red-500' : ''}
            />
            {errors.linkedin && (
              <p className="text-sm text-red-500">{errors.linkedin.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination">Preferred Destination</Label>
            <select
              id="destination"
              {...register('destination')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white ${
                errors.destination ? 'border-red-500' : 'border-slate-200'
              }`}
            >
              <option value="salesjobsbali">Bali, Indonesia</option>
              <option value="salesjobsthailand">Thailand</option>
              <option value="salesjobsvietnam">Vietnam</option>
              <option value="salesjobscambodia">Cambodia</option>
              <option value="salesjobsunitedkingdom">United Kingdom</option>
              <option value="remotesalesjobs">Remote</option>
            </select>
            {errors.destination && (
              <p className="text-sm text-red-500">{errors.destination.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Relevant Sales Experience</Label>
            <Textarea
              id="experience"
              placeholder="Tell us about your track record, OTEs hit, and why you want to work in SE Asia..."
              className={errors.experience ? 'border-red-500 min-h-[150px]' : 'min-h-[150px]'}
              {...register('experience')}
            />
            {errors.experience && (
              <p className="text-sm text-red-500">{errors.experience.message}</p>
            )}
          </div>

          <div className="pt-4">
            <Button type="submit" size="lg" className="w-full bg-secondary-500 hover:bg-secondary-600 text-white font-bold" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
              {isSubmitting ? null : <ArrowRight className="ml-2 h-5 w-5" />}
            </Button>
          </div>
          
          <p className="text-xs text-center text-slate-500">
            By clicking Submit, you agree to our Terms of Service and Privacy Policy.
          </p>
        </form>
      </div>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <Suspense fallback={<div className="text-center py-20">Loading form...</div>}>
            <ApplyForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
