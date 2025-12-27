import { User } from './userRepo';
import { TutorProfile } from './tutorRepo';
import { Session } from './sessionRepo';

class MockDataStore {
    users = new Map<string, User>();
    tutors = new Map<string, TutorProfile>();
    sessions = new Map<string, Session>();

    constructor() {
        this.seed();
    }

    private seed() {
        const tutorId = 'tutor-1';
        const studentId = 'student-1';
        const parentId = 'parent-1';
        const adminId = 'admin-1';

        this.users.set(tutorId, {
            id: tutorId,
            role: 'tutor',
            created_at: new Date().toISOString(),
        });

        this.users.set(studentId, {
            id: studentId,
            role: 'student',
            created_at: new Date().toISOString(),
        });

        this.users.set(parentId, {
            id: parentId,
            role: 'parent',
            created_at: new Date().toISOString(),
        });

        this.users.set(adminId, {
            id: adminId,
            role: 'admin',
            created_at: new Date().toISOString(),
        });

        this.tutors.set(tutorId, {
            user_id: tutorId,
            bio: 'Experienced Math and Physics tutor with 10 years experience.',
            hourly_rate: 50,
            toggle_active: true,
            experience_years: 10,
            timezone: 'UTC',
            updated_at: new Date().toISOString(),
        });

        const sessionId1 = 'session-1';
        this.sessions.set(sessionId1, {
            id: sessionId1,
            student_id: studentId,
            parent_id: parentId,
            tutor_id: null,
            status: 'PENDING_MATCH',
            subject: 'AP Biology',
            gradeLevel: 11,
            preferredTimes: ['Mon, December 29, 2025 @ 4:00 PM', 'Wed, December 31, 2025 @ 4:00 PM'],
            created_at: new Date().toISOString(),
        });

        const sessionId2 = 'session-2';
        this.sessions.set(sessionId2, {
            id: sessionId2,
            student_id: studentId,
            parent_id: parentId,
            tutor_id: tutorId,
            status: 'PENDING_PARENT_APPROVAL',
            subject: 'Algebra II',
            gradeLevel: 10,
            preferredTimes: ['Tue, December 30, 2025 @ 5:00 PM'],
            created_at: new Date().toISOString(),
        });
    }
}

// Prevent multiple instances of MockDataStore in development due to HMR
const globalForMock = globalThis as unknown as { mockDb: MockDataStore };
export const mockDb = globalForMock.mockDb || new MockDataStore();
if (process.env.NODE_ENV !== 'production') globalForMock.mockDb = mockDb;
