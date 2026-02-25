import { z } from 'zod';

export const CreateRequestBodySchema = z.object({
    subject: z.string().min(1),
    gradeLevel: z.number().min(1).max(12),
    preferredTimes: z.array(z.string()).min(1),
});

export const SessionActionBodySchema = z.object({
    action: z.enum(['MATCH', 'APPROVE', 'DECLINE', 'REQUEST_NEW_TUTOR', 'REASSIGN']),
    tutorId: z.string().optional(),
    reason: z.string().optional(),
});

export type CreateRequestBody = z.infer<typeof CreateRequestBodySchema>;
export type SessionActionBody = z.infer<typeof SessionActionBodySchema>;
