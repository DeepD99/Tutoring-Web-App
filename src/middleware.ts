import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const sessionCookie = request.cookies.get('tp_session');
    const { pathname } = request.nextUrl;

    const protectedPaths = ['/dashboard', '/tutor', '/sessions'];
    const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

    // Redirect to login if accessing protected route without session
    if (isProtectedPath && !sessionCookie) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Redirect to dashboard if logged in and visiting login
    if (pathname.startsWith('/login') && sessionCookie) {
        try {
            JSON.parse(sessionCookie.value);
            return NextResponse.redirect(new URL('/dashboard', request.url));
        } catch {
            // Invalid cookie, let them through to login
        }
    }

    if (isProtectedPath && sessionCookie) {
        try {
            const session = JSON.parse(sessionCookie.value);

            // Tutor-only routes
            if (pathname.startsWith('/tutor') && session.role !== 'tutor') {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }
        } catch {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/tutor/:path*', '/sessions/:path*', '/login'],
};
