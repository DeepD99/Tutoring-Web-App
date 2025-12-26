import { ISessionRepository, Session } from './sessionRepo';
import { mockDb } from './mockDb';

export class MockSessionRepository implements ISessionRepository {
    async createRequest(data: {
        studentId: string;
        parentId?: string;
        subject: string;
        gradeLevel: number;
        preferredTimes: string[];
    }): Promise<Session> {
        const session: Session = {
            id: crypto.randomUUID(),
            student_id: data.studentId,
            parent_id: data.parentId || null,
            tutor_id: null,
            status: 'PENDING_MATCH',
            subject: data.subject,
            gradeLevel: data.gradeLevel,
            preferredTimes: data.preferredTimes,
            created_at: new Date().toISOString(),
        };
        mockDb.sessions.set(session.id, session);
        return session;
    }

    async matchTutor(sessionId: string, tutorId: string): Promise<void> {
        const session = mockDb.sessions.get(sessionId);
        if (!session) throw new Error('Session not found');
        session.tutor_id = tutorId;
        session.status = 'PENDING_PARENT_APPROVAL';
    }

    async approveSession(sessionId: string): Promise<void> {
        const session = mockDb.sessions.get(sessionId);
        if (!session) throw new Error('Session not found');
        session.status = 'CONFIRMED';
    }

    async declineSession(sessionId: string): Promise<void> {
        const session = mockDb.sessions.get(sessionId);
        if (!session) throw new Error('Session not found');
        session.status = 'DECLINED';
    }

    async requestNewTutor(sessionId: string): Promise<void> {
        const session = mockDb.sessions.get(sessionId);
        if (!session) throw new Error('Session not found');
        session.status = 'NEEDS_REASSIGNMENT';
    }

    async reassignSession(sessionId: string, newTutorId: string): Promise<void> {
        const session = mockDb.sessions.get(sessionId);
        if (!session) throw new Error('Session not found');
        session.tutor_id = newTutorId;
        session.status = 'PENDING_PARENT_APPROVAL';
    }

    async getSessionsByUser(userId: string, role: string): Promise<Session[]> {
        const sessions = Array.from(mockDb.sessions.values());
        if (role === 'admin') return sessions;
        if (role === 'tutor') return sessions.filter(s => s.tutor_id === userId);

        // Mock Family Logic: In local mode, let student-1 and parent-1 see the same sessions
        if (role === 'student' || role === 'parent') {
            return sessions.filter(s =>
                s.student_id === userId ||
                s.parent_id === userId ||
                (s.student_id === 'student-1' && userId === 'parent-1') ||
                (s.parent_id === 'parent-1' && userId === 'student-1')
            );
        }
        return [];
    }

    async getSessionById(sessionId: string): Promise<Session | null> {
        return mockDb.sessions.get(sessionId) || null;
    }

    async getAllSessions(): Promise<Session[]> {
        return Array.from(mockDb.sessions.values());
    }
}
