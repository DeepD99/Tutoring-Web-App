export type UserRole = 'student' | 'parent' | 'tutor' | 'admin';

export type SessionStatus =
    | 'PENDING_MATCH'
    | 'PENDING_PARENT_APPROVAL'
    | 'CONFIRMED'
    | 'DECLINED'
    | 'NEEDS_REASSIGNMENT';

export type SessionAction =
    | 'MATCH'
    | 'APPROVE'
    | 'DECLINE'
    | 'REQUEST_NEW_TUTOR'
    | 'REASSIGN';
