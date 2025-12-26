import { NextResponse } from 'next/server';
import { setSessionCookie, UserRole, readSessionCookie } from '@/lib/auth/session';

export async function POST(request: Request) {
    try {
        const { role } = await request.json() as { role: UserRole };

        if (!role) {
            return NextResponse.json({ error: 'Role is required' }, { status: 400 });
        }

        // Use static IDs from mockDb seed to maintain consistency during testing
        const userId = `${role}-1`;

        await setSessionCookie({ userId, role });

        return NextResponse.json({ ok: true, userId, role });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    const session = await readSessionCookie();
    return NextResponse.json(session || { error: 'No session' });
}
