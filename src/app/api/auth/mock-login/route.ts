import { NextResponse } from 'next/server';
import { setSessionCookie, UserRole } from '@/lib/auth/session';

export async function POST(request: Request) {
    try {
        const { role } = await request.json() as { role: UserRole };

        if (!role) {
            return NextResponse.json({ error: 'Role is required' }, { status: 400 });
        }

        const userId = crypto.randomUUID();

        await setSessionCookie({ userId, role });

        return NextResponse.json({ ok: true, userId, role });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
