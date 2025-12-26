import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const sessionCookie = request.cookies.get('tp_session');
    const { pathname } = request.nextUrl;

    // Protected paths
    const isDashboardPath = pathname.startsWith('/dashboard');
    const isTutorPath = pathname.startsWith('/tutor');

    if (isDashboardPath || isTutorPath) {
        if (!sessionCookie) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
            const session = JSON.parse(sessionCookie.value);

            // Tutor specific protection
            if (isTutorPath && session.role !== 'tutor') {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }
        } catch (e) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/tutor/:path*'],
};
