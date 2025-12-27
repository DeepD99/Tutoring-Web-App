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
Visit [https://tutoring-web-app-chi.vercel.app/login] to start.

## 🔑 Mock Authentication
For initial development, we use a mock authentication system:
- Access `/login` to choose a role.
- A cookie named `tp_session` is set to store a random UUID and the chosen role.
- Middleware protects `/dashboard` and `/tutor/*` routes.

## 🏗️ Project Structure
- `src/app/api`: API routes for auth, profiles, and sessions.
- `src/lib/auth`: Session management logic.
- `src/lib/repositories`: Repository interfaces and implementations (DB-Contract Mode).
- `src/lib/supabase`: Supabase client configuration.
- `src/middleware.ts`: Route protection and role-based access.
- `supabase/schema`: SQL migration files.

## 📦 DB-Contract Mode
The application uses a **Repository Pattern** to decouple business logic from the database provider. This allows development to continue even when Supabase is unavailable.

- **Mock Repositories**: When `APP_ENV=local`, the app uses in-memory Map-based repositories (`*.mock.ts`).
- **Data Persistence**: Mock data is lost on server restart. A default set of users (Tutor, Student, Parent) is seeded on initialization.
- **Switching to Supabase**: To switch to Supabase, implement the repository interfaces using `@supabase/supabase-js` and update the factory in `src/lib/repositories/index.ts`.
