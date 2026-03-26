'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { login } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

const initialState = {
  error: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button 
      type="submit" 
      className="w-full bg-navy-900 hover:bg-navy-800 text-white font-semibold h-12"
      disabled={pending}
    >
      {pending ? 'Verifying...' : 'Access Admin Panel'}
    </Button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useFormState(login, initialState);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8 space-y-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <Image 
            src="/images/logo-utama.webp" 
            alt="Dream Sales Jobs" 
            title="Dream Sales Jobs"
            width={220} 
            height={55} 
            className="h-16 w-auto object-contain mx-auto mb-2"
            priority
          />
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-navy-900">Admin CMS Login</h1>
            <p className="text-sm text-slate-500">
              Enter the master password to access the content management system.
            </p>
          </div>
        </div>

        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password">Admin Password</Label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              required 
              placeholder="Enter password..."
              className="h-12"
            />
            {state?.error && (
              <p className="text-sm text-red-500 font-medium animate-in fade-in slide-in-from-top-1">
                {state.error}
              </p>
            )}
          </div>

          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
