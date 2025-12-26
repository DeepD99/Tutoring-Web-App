import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  APP_ENV: z.enum(['local', 'development', 'production']).default('local'),
});

const processEnv = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  APP_ENV: process.env.APP_ENV,
};

const parsed = envSchema.safeParse(processEnv);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  // In development, we might not have all vars yet, so don't crash the whole app immediately 
  // but warn heavily. If it's a browser env, we only have NEXT_PUBLIC_ keys.
}

export const env = parsed.success ? parsed.data : (processEnv as z.infer<typeof envSchema>);
