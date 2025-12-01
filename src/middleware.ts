import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Exempt the login page from authentication check.
 * If the request is for /login, allow it without checking the token.
 */
export function isLoginPage(request: NextRequest) {
  return request.nextUrl.pathname === '/auth/signin';
}

export function isLandingPage(request: NextRequest) {
  return request.nextUrl.pathname === '/';
}


export function middleware(request: NextRequest) {
  if (isLoginPage(request)) {
    return NextResponse.next();
  }

  const token = request.cookies.get('auth-token')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }
  // If user is on /login and already has a token, redirect to previous page or home
  if (request.nextUrl.pathname === '/auth/signin' && token) {
    const prev = request.headers.get('referer') || '/';
    return NextResponse.redirect(new URL(prev, request.url));
  }

  return NextResponse.next();
}

// Specify paths to apply the middleware
export const config = {
  matcher: ['/((?!_next|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|map|json|txt|pdf)).*)', '/login'],
};
