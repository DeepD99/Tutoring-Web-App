# Dashboard Integration Guide

## Files Created

1. `StudentDashboard.tsx` - Main dashboard component
2. `dashboard.css` - Dashboard styles
3. `page.tsx` - Next.js page wrapper

## Integration Steps

### Step 1: Create File Structure

In your `Tutoring-Web-App/src/` directory:

```bash
# Create dashboard route
mkdir -p app/dashboard

# Create components directory for dashboard
mkdir -p components/Dashboard
```

### Step 2: Place Files in Correct Locations

```
src/
├── app/
│   └── dashboard/
│       └── page.tsx                    ← Place the page.tsx file here
│
├── components/
│   └── Dashboard/
│       ├── StudentDashboard.tsx        ← Place the main component here
│       └── dashboard.css               ← Place the CSS file here
```

**File Mapping**:
- `page.tsx` → `src/app/dashboard/page.tsx`
- `StudentDashboard.tsx` → `src/components/Dashboard/StudentDashboard.tsx`
- `dashboard.css` → `src/components/Dashboard/dashboard.css`

### Step 3: Add Font Import to Layout

Edit `src/app/layout.tsx` to include the Outfit and DM Sans fonts:

```typescript
import { Outfit, DM_Sans } from 'next/font/google';

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500', '700'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

### Step 4: Update Global CSS (Optional)

If you want the dashboard background to apply globally, add to `src/app/globals.css`:

```css
body {
  margin: 0;
  padding: 0;
  font-family: var(--font-dm-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

### Step 5: Protect the Dashboard Route (Add Auth)

Create a middleware to protect the dashboard:

**Create `src/middleware.ts`**:

```typescript
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If accessing dashboard without session, redirect to login
  if (req.nextUrl.pathname.startsWith('/dashboard') && !session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If logged in and trying to access login, redirect to dashboard
  if (req.nextUrl.pathname.startsWith('/login') && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
```

### Step 6: Connect to Real Data (Supabase)

**Update `StudentDashboard.tsx` to fetch real data**:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import './dashboard.css';

export default function StudentDashboard() {
  const supabase = createClientComponentClient();
  const [student, setStudent] = useState(null);
  const [grades, setGrades] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) return;

        // Fetch student profile
        const { data: studentData } = await supabase
          .from('students')
          .select('*')
          .eq('id', user.id)
          .single();

        setStudent(studentData);

        // Fetch grades
        const { data: gradesData } = await supabase
          .from('grades')
          .select('*')
          .eq('student_id', user.id)
          .order('created_at', { ascending: false });

        setGrades(gradesData || []);

        // Fetch upcoming sessions
        const { data: sessionsData } = await supabase
          .from('tutoring_sessions')
          .select(`
            *,
            tutors (
              first_name,
              last_name
            )
          `)
          .eq('student_id', user.id)
          .gte('scheduled_date', new Date().toISOString())
          .order('scheduled_date', { ascending: true })
          .limit(5);

        setSessions(sessionsData || []);
      } catch (error) {
        console.error('Error loading dashboard:', error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [supabase]);

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  // Rest of component with real data...
}
```

### Step 7: Test the Integration

1. **Start your dev server**:
   ```bash
   npm run dev
   ```

2. **Navigate to dashboard**:
   ```
   http://localhost:3000/dashboard
   ```

3. **Verify**:
   - Dashboard loads with styling
   - Fonts render correctly
   - Mock data displays properly
   - Components are interactive

### Step 8: Commit to GitHub

```bash
git add src/app/dashboard/page.tsx
git add src/components/Dashboard/
git add src/middleware.ts
git commit -m "feat(dashboard): add student dashboard with grades, sessions, and homework tracking"
git push origin main
```

## File Locations Summary

| File | Location in Your Repo |
|------|----------------------|
| `page.tsx` | `src/app/dashboard/page.tsx` |
| `StudentDashboard.tsx` | `src/components/Dashboard/StudentDashboard.tsx` |
| `dashboard.css` | `src/components/Dashboard/dashboard.css` |
| `middleware.ts` | `src/middleware.ts` (root of src/) |

## Routing Explanation

**Next.js App Router** automatically creates routes based on folder structure:

- `src/app/dashboard/page.tsx` → Creates route at `/dashboard`
- When user visits `/dashboard`, Next.js renders this page
- Middleware checks if user is authenticated before showing dashboard
- If not authenticated, redirects to `/login`

## Authentication Flow

```
User logs in at /login
    ↓
Supabase creates session
    ↓
Redirect to /dashboard
    ↓
Middleware checks session
    ↓
✅ Session exists → Show dashboard
❌ No session → Redirect to /login
```

## Next Steps

### 1. Replace Mock Data with Real Data
- Follow Step 6 to connect to Supabase
- Update database schema to match required fields
- Test with real student data

### 2. Add More Dashboard Features
- Grade trend charts (use Recharts or Chart.js)
- Session detail modals
- Homework file uploads
- Progress reports export

### 3. Create Other Role Dashboards
- Parent dashboard (different metrics)
- Tutor dashboard (session logging interface)
- Admin dashboard (platform-wide stats)

## Common Issues & Solutions

### Issue: Styles not loading
**Solution**: Make sure CSS import is present in component:
```typescript
import './dashboard.css';
```

### Issue: Fonts not rendering
**Solution**: Check that font variables are added to `layout.tsx` and referenced in CSS

### Issue: Route not found
**Solution**: Verify file is at `src/app/dashboard/page.tsx` (not `pages/`)

### Issue: Redirect loop
**Solution**: Check middleware logic - ensure login and dashboard have different conditions

### Issue: TypeScript errors
**Solution**: Install types:
```bash
npm install --save-dev @types/node @types/react
```

## Performance Optimization

**Current Implementation**:
- CSS-only animations (60fps guaranteed)
- No external dependencies for UI
- Lazy loading could be added for grade charts

**Future Optimizations**:
- Add React.lazy() for heavy components
- Implement virtual scrolling for long lists
- Cache dashboard data in localStorage
- Add service worker for offline access

## Design Customization

**To adjust colors**:
Edit CSS variables in `dashboard.css`:
```css
:root {
  --navy-deep: #0A1628;      /* Change to your brand color */
  --orange-vibrant: #FF6B35;  /* Change to your accent color */
}
```

**To change fonts**:
Update imports in `layout.tsx` and font families in CSS

**To modify layout**:
Adjust grid template columns in `.dashboard-grid` class
