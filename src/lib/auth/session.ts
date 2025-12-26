import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'tp_session';

export type UserRole = 'student' | 'parent' | 'tutor' | 'admin';

export interface SessionData {
    userId: string;
    role: UserRole;
}

export async function setSessionCookie(data: SessionData) {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(data), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
    });
}

export async function clearSessionCookie() {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function readSessionCookie(): Promise<SessionData | null> {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_COOKIE_NAME);

    if (!session) return null;

    try {
        return JSON.parse(session.value) as SessionData;
    } catch (e) {
        return null;
    }
}
