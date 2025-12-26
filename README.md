# Tutoring Web App

Foundation for a tutoring platform built with Next.js (App Router), TypeScript, and Supabase.

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
Copy `.env.example` to `.env.local` and fill in your Supabase credentials.
```bash
cp .env.example .env.local
```
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key.

### 3. Database Setup (Optional for Day 1)
Run the SQL scripts located in `supabase/schema/` in your Supabase SQL Editor:
1. `001_init.sql`
2. `002_rls_policies.sql`

### 4. Run Development Server
```bash
npm run dev
```
Visit [http://localhost:3000/login](http://localhost:3000/login) to start.

## 🔑 Mock Authentication
For initial development, we use a mock authentication system:
- Access `/login` to choose a role.
- A cookie named `tp_session` is set to store a random UUID and the chosen role.
- Middleware protects `/dashboard` and `/tutor/*` routes.

## 🏗️ Project Structure
- `src/app/api`: API routes for auth and profiles.
- `src/lib/auth`: Session management logic.
- `src/lib/supabase`: Supabase client configuration.
- `src/middleware.ts`: Route protection and role-based access.
- `supabase/schema`: SQL migration files.
