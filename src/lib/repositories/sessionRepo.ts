import { SessionStatus } from '../domain/types';

export interface Session {
    id: string;
    tutor_id: string | null;
    student_id: string;
    parent_id: string | null;
    status: SessionStatus;
    subject: string;
    gradeLevel: number;
    preferredTimes: string[];
    start_at?: string;
    end_at?: string;
    created_at: string;
}

export interface ISessionRepository {
    createRequest(data: {
        studentId: string;
        parentId?: string;
        subject: string;
        gradeLevel: number;
        preferredTimes: string[];
    }): Promise<Session>;
    matchTutor(sessionId: string, tutorId: string): Promise<void>;
    approveSession(sessionId: string): Promise<void>;
    declineSession(sessionId: string): Promise<void>;
    requestNewTutor(sessionId: string): Promise<void>;
    reassignSession(sessionId: string, newTutorId: string): Promise<void>;
    getSessionsByUser(userId: string, role: string): Promise<Session[]>;
    getSessionById(sessionId: string): Promise<Session | null>;
    getAllSessions(): Promise<Session[]>; // For admin
}
