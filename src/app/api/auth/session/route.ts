import { NextResponse } from 'next/server';
import { readSessionCookie } from '@/lib/auth/session';

export async function GET() {
    const session = await readSessionCookie();
    return NextResponse.json(session || { error: 'No session' });
}
