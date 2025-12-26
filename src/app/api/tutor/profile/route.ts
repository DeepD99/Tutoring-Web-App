import { NextResponse } from 'next/server';
import { readSessionCookie } from '@/lib/auth/session';
import { supabaseServer } from '@/lib/supabase/server';

export async function GET() {
    const session = await readSessionCookie();

    if (!session || session.role !== 'tutor') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const supabase = supabaseServer();
        const { data, error } = await supabase
            .from('tutors')
            .select('*')
            .eq('user_id', session.userId)
            .single();

        if (error) {
            // If table doesn't exist or env not set, return mocked data for Day 1
            console.warn('Supabase fetch failed, returning mock data:', error.message);
            return NextResponse.json({
                profile: {
                    bio: 'Mock bio - please set up Supabase to persist.',
                    hourly_rate: 45,
                    experience_years: 5,
                    timezone: 'America/New_York',
                    toggle_active: true
                },
                isMocked: true
            });
        }

        return NextResponse.json({ profile: data });
    } catch (err) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await readSessionCookie();

    if (!session || session.role !== 'tutor') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const supabase = supabaseServer();

        // In a real app, we'd validate 'body' with Zod
        // For Day 1, we attempt an upsert but catch errors if DB isn't ready
        const { error } = await supabase
            .from('tutors')
            .upsert({
                user_id: session.userId,
                ...body,
                updated_at: new Date().toISOString(),
            });

        if (error) {
            return NextResponse.json({
                error: 'Supabase storage failed',
                message: 'Database tables might not be created yet. Run the SQL scripts in /supabase/schema.',
                mockSavedBody: body
            }, { status: 503 });
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
