import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin-dreamsalesjobs');
  const isLoginPage = request.nextUrl.pathname === '/admin-dreamsalesjobs/login';

  if (isAdminPath && !isLoginPage) {
    const authCookie = request.cookies.get('admin_auth');
    
    if (!authCookie || authCookie.value !== 'true') {
      return NextResponse.redirect(new URL('/admin-dreamsalesjobs/login', request.url));
    }
  }

  // Redirect authenticated users away from login page
  if (isLoginPage) {
    const authCookie = request.cookies.get('admin_auth');
    if (authCookie && authCookie.value === 'true') {
      return NextResponse.redirect(new URL('/admin-dreamsalesjobs', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin-dreamsalesjobs/:path*'],
};
