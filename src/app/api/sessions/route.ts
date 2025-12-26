import { NextResponse } from 'next/server';
import { readSessionCookie } from '@/lib/auth/session';
import { sessionRepo } from '@/lib/repositories';
import { CreateRequestBodySchema } from '@/lib/domain/validation';

export async function GET() {
    const session = await readSessionCookie();

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const sessions = await sessionRepo.getSessionsByUser(session.userId, session.role);
        return NextResponse.json({ sessions });
    } catch (err) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await readSessionCookie();

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const result = CreateRequestBodySchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: 'Invalid request body', details: result.error.flatten() }, { status: 400 });
        }

        const { subject, gradeLevel, preferredTimes } = result.data;

        const newSession = await sessionRepo.createRequest({
            studentId: session.userId,
            parentId: session.role === 'parent' ? session.userId : (session.userId === 'student-1' ? 'parent-1' : undefined),
            subject,
            gradeLevel,
            preferredTimes,
        });

        return NextResponse.json({ ok: true, session: newSession });
    } catch (err) {
        console.error('Session creation error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
