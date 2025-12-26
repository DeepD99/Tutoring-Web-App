import { createClient } from '@supabase/supabase-js';
import { env } from '../env';

export function supabaseServer() {
    // Implementation note: For now using public keys. 
    // Later this will be updated to use server-side auth (cookies).
    return createClient(
        env.NEXT_PUBLIC_SUPABASE_URL,
        env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
}
