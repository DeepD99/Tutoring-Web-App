import { env } from '../env';
import { MockUserRepository } from './userRepo.mock';
import { MockTutorRepository } from './tutorRepo.mock';
import { MockSessionRepository } from './sessionRepo.mock';
import { IUserRepository } from './userRepo';
import { ITutorRepository } from './tutorRepo';
import { ISessionRepository } from './sessionRepo';

// For now, only mock repos exist. Later we will add Supabase implementations.
let userRepo: IUserRepository;
let tutorRepo: ITutorRepository;
let sessionRepo: ISessionRepository;

if (env.APP_ENV === 'local') {
    userRepo = new MockUserRepository();
    tutorRepo = new MockTutorRepository();
    sessionRepo = new MockSessionRepository();
} else {
    // Fallback to mock if Supabase repos aren't implemented yet
    userRepo = new MockUserRepository();
    tutorRepo = new MockTutorRepository();
    sessionRepo = new MockSessionRepository();
}

export { userRepo, tutorRepo, sessionRepo };
