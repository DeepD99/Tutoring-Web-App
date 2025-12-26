export type UserRole = 'student' | 'parent' | 'tutor' | 'admin';

export interface User {
    id: string;
    role: UserRole;
    host_user_id?: string;
    created_at: string;
}

export interface IUserRepository {
    getUserById(id: string): Promise<User | null>;
    createUser(user: Partial<User>): Promise<User>;
}
