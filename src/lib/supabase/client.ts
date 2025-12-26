import { createClient } from '@supabase/supabase-js';
import { env } from '../env';

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabaseBrowser = createClient(supabaseUrl, supabaseKey);
