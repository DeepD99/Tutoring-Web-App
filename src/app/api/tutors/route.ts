import { NextResponse } from 'next/server';
import { tutorRepo } from '@/lib/repositories';

export async function GET() {
    try {
        const tutors = await tutorRepo.getAllTutors(true);
        return NextResponse.json({ tutors });
    } catch (err) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
