'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(prevState: any, formData: FormData) {
  const password = formData.get('password');
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return { error: 'Admin password is not configured.' };
  }

  if (password === adminPassword) {
    cookies().set('admin_auth', 'true', { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });
  } else {
    return { error: 'Incorrect password. Please try again.' };
  }

  // Redirect after setting cookie (must be outside try/catch if any, but here is fine)
  redirect('/admin-dreamsalesjobs');
}

export async function logout() {
  cookies().delete('admin_auth');
  redirect('/admin-dreamsalesjobs/login');
}
