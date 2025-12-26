import { IUserRepository, User } from './userRepo';
import { mockDb } from './mockDb';

export class MockUserRepository implements IUserRepository {
    async getUserById(id: string): Promise<User | null> {
        return mockDb.users.get(id) || null;
    }

    async createUser(user: Partial<User>): Promise<User> {
        const newUser: User = {
            id: user.id || crypto.randomUUID(),
            role: user.role || 'student',
            created_at: new Date().toISOString(),
            ...user,
        };
        mockDb.users.set(newUser.id, newUser);
        return newUser;
    }
}
