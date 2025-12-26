export interface TutorProfile {
    user_id: string;
    bio: string;
    hourly_rate: number;
    toggle_active: boolean;
    experience_years: number;
    timezone: string;
    updated_at: string;
}

export interface ITutorRepository {
    getTutorByUserId(userId: string): Promise<TutorProfile | null>;
    upsertTutorProfile(profile: Partial<TutorProfile>): Promise<void>;
    getAllTutors(activeOnly?: boolean): Promise<TutorProfile[]>;
}
