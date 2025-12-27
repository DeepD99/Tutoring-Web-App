import { NextResponse } from 'next/server';
import { sessionRepo } from '@/lib/repositories';

export async function POST() {
    try {
        await sessionRepo.clearAllSessions();
        return NextResponse.json({ ok: true });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
