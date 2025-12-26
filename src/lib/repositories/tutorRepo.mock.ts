import { ITutorRepository, TutorProfile } from './tutorRepo';
import { mockDb } from './mockDb';

export class MockTutorRepository implements ITutorRepository {
    async getTutorByUserId(userId: string): Promise<TutorProfile | null> {
        return mockDb.tutors.get(userId) || null;
    }

    async upsertTutorProfile(profile: Partial<TutorProfile>): Promise<void> {
        if (!profile.user_id) throw new Error('User ID is required for profile upsert');

        const existing = mockDb.tutors.get(profile.user_id) || {
            user_id: profile.user_id,
            bio: '',
            hourly_rate: 0,
            toggle_active: true,
            experience_years: 0,
            timezone: 'UTC',
            updated_at: new Date().toISOString(),
        };

        const updated: TutorProfile = {
            ...existing,
            ...profile,
            updated_at: new Date().toISOString(),
        };

        mockDb.tutors.set(profile.user_id, updated);
    }

    async getAllTutors(activeOnly = true): Promise<TutorProfile[]> {
        const all = Array.from(mockDb.tutors.values());
        return activeOnly ? all.filter(t => t.toggle_active) : all;
    }
}
