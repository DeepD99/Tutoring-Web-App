import { NextResponse } from 'next/server';
import { readSessionCookie } from '@/lib/auth/session';
import { tutorRepo } from '@/lib/repositories';

export async function GET() {
    const session = await readSessionCookie();

    if (!session || session.role !== 'tutor') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const data = await tutorRepo.getTutorByUserId(session.userId);

        if (!data) {
            return NextResponse.json({
                profile: {
                    bio: '',
                    hourly_rate: 0,
                    experience_years: 0,
                    timezone: 'UTC',
                    toggle_active: true
                }
            });
        }

        return NextResponse.json({ profile: data });
    } catch (err) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await readSessionCookie();

    if (!session || session.role !== 'tutor') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        await tutorRepo.upsertTutorProfile({
            user_id: session.userId,
            ...body,
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
