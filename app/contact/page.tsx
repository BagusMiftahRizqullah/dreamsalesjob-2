'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '@/lib/schemas';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CheckCircle2, Mail, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Form data:', data);
    setIsSubmitted(true);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
                Get in Touch
              </h1>
              <p className="mt-4 text-lg text-slate-600">
                Have questions about relocating or hiring? We&apos;re here to help.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-4">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 flex-shrink-0">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-navy-900">Email Us</p>
                        <a href="mailto:hello@dreamsalesjobs.com" className="text-slate-600 hover:text-primary-600">
                          hello@dreamsalesjobs.com
                        </a>
                        <p className="text-sm text-slate-500 mt-1">We typically reply within 24 hours.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-600 flex-shrink-0">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-navy-900">Headquarters</p>
                        <p className="text-slate-600">
                          Jalan Pantai Berawa,<br />
                          Canggu, Bali 80361,<br />
                          Indonesia
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-navy-900 text-white p-8 rounded-xl relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-4">Looking for a job?</h3>
                    <p className="text-slate-300 mb-6">
                      The fastest way to get hired is to apply directly for an open role or join our talent pool.
                    </p>
                    <Button onClick={() => window.location.href = '/jobs'} variant="outline" className="border-white text-white hover:bg-white hover:text-navy-900">
                      Browse Jobs
                    </Button>
                  </div>
                  <div className="absolute top-0 right-0 -mt-10 -mr-10 h-32 w-32 bg-primary-500/20 rounded-full blur-2xl" />
                </div>
              </div>

              {/* Form */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-navy-900 mb-2">Message Sent!</h3>
                    <p className="text-slate-600 mb-6">
                      Thanks for reaching out. We&apos;ll get back to you shortly.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)} variant="outline">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        {...register('name')}
                        className={errors.name ? 'border-red-500' : ''}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        {...register('email')}
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="How can we help you?"
                        className={errors.message ? 'border-red-500 min-h-[150px]' : 'min-h-[150px]'}
                        {...register('message')}
                      />
                      {errors.message && (
                        <p className="text-sm text-red-500">{errors.message.message}</p>
                      )}
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      {isSubmitting ? null : <Send className="ml-2 h-4 w-4" />}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
