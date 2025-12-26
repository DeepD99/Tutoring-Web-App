import { createClient } from '@supabase/supabase-js';
import { env } from '../env';

export function supabaseServer() {
    const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase credentials missing. Check your .env.local file.');
    }

    return createClient(supabaseUrl, supabaseKey);
}
