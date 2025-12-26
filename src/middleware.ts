import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const sessionCookie = request.cookies.get('tp_session');
    const { pathname } = request.nextUrl;

    // Paths requiring authentication
    const protectedPaths = ['/dashboard', '/tutor', '/request', '/sessions', '/requests'];
    const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

    if (isProtectedPath) {
        if (!sessionCookie) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
            const session = JSON.parse(sessionCookie.value);

            // Tutor specific protection
            if (pathname.startsWith('/tutor') && session.role !== 'tutor') {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }

            // Admin specific protection
            if (pathname.startsWith('/requests') && session.role !== 'admin') {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }

            // Parent/Student specific protection (Exclusive to /request but not /requests)
            if (pathname.startsWith('/request') && !pathname.startsWith('/requests') && !['parent', 'student'].includes(session.role)) {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }

        } catch (e) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/tutor/:path*', '/request/:path*', '/sessions/:path*', '/requests/:path*'],
};
