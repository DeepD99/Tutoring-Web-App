import { NextResponse } from 'next/server';
import { readSessionCookie } from '@/lib/auth/session';
import { sessionRepo } from '@/lib/repositories';
import { SessionActionBodySchema } from '@/lib/domain/validation';

export async function POST(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const session = await readSessionCookie();
    const { id } = await props.params;

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const result = SessionActionBodySchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: 'Invalid action body', details: result.error.flatten() }, { status: 400 });
        }

        const { action, tutorId } = result.data;

        // Role-based authorization
        if (action === 'MATCH' || action === 'REASSIGN') {
            if (session.role !== 'admin') {
                return NextResponse.json({ error: 'Forbidden: Admin only' }, { status: 403 });
            }
        } else if (['APPROVE', 'DECLINE', 'REQUEST_NEW_TUTOR'].includes(action)) {
            if (!['parent', 'student'].includes(session.role)) {
                return NextResponse.json({ error: 'Forbidden: Parent or Student only' }, { status: 403 });
            }
        }

        switch (action) {
            case 'MATCH':
                if (!tutorId) return NextResponse.json({ error: 'tutorId required for MATCH' }, { status: 400 });
                await sessionRepo.matchTutor(id, tutorId);
                break;
            case 'APPROVE':
                await sessionRepo.approveSession(id);
                break;
            case 'DECLINE':
                await sessionRepo.declineSession(id);
                break;
            case 'REQUEST_NEW_TUTOR':
                await sessionRepo.requestNewTutor(id);
                break;
            case 'REASSIGN':
                if (!tutorId) return NextResponse.json({ error: 'tutorId required for REASSIGN' }, { status: 400 });
                await sessionRepo.reassignSession(id, tutorId);
                break;
            default:
                return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }

        return NextResponse.json({ ok: true });
    } catch (err: any) {
        console.error('Session action error:', err);
        return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
    }
}
