# PROJECT_CONTEXT.md

## Platform Overview

### What We're Building
A tutoring coordination and academic progress tracking portal for high school student-athletes. This platform helps students, parents, and tutors manage tutoring sessions, track homework assignments, and monitor grade improvements.

### What We're NOT Building
- NCAA eligibility tracking (handled by parent platform)
- College recruiting/matching (handled by parent platform)
- Athletic performance metrics (not our focus)
- Payment/billing system (handled by parent platform)

### Core Value Proposition
"Simple tutoring coordination with clear grade improvement visibility."

---

## Target Users & Their Needs

### Student Athletes (Primary Users)
**Age**: 14-18 years old (grades 9-12)
**Tech savviness**: Mobile-first, expect intuitive interfaces
**Primary needs**:
- See upcoming tutoring sessions at a glance
- Track homework assignments from tutors
- Monitor their own grade trends
- Request additional help when struggling

**Key pain point**: Juggling sports schedule + academics + tutoring sessions across multiple subjects

### Parents (Secondary Users)
**Primary needs**:
- Schedule tutoring sessions easily
- See if tutoring investment is paying off (grade improvements)
- Get notified when student misses sessions or grades drop
- Review tutor notes to stay informed

**Key pain point**: Lack of visibility into whether tutoring is actually helping, plus coordinating schedules

### Tutors (Tertiary Users)
**Primary needs**:
- View assigned students and session schedule
- Log session notes quickly after meetings
- Assign homework and track completion
- Flag students who need extra attention
- See grade history to measure their effectiveness

**Key pain point**: Too much admin overhead logging sessions, no easy way to track if their tutoring is improving grades

---

## Core Features (Priority Order)

### 1. Session Management (CRITICAL PATH)
**Why first**: Everything else depends on having sessions scheduled and tracked.

**Features**:
- Calendar view of upcoming sessions (student, parent, tutor)
- Session scheduling (parent initiates, tutor confirms)
- Session status: Scheduled → Completed → Notes logged
- Attendance tracking (did student show up?)
- Session history with filterable views

**Data needed**:
- Session date/time
- Student + Tutor + Subject
- Location (in-person address or virtual meeting link)
- Status (scheduled/completed/cancelled/no-show)

### 2. Grade Tracking (HIGH PRIORITY)
**Why important**: Core proof-of-value for parents - "is tutoring working?"

**Features**:
- Current grade display by subject
- Grade trend visualization (line chart over semesters)
- Before/after tutoring comparison
- Color-coded alerts (red = needs help, yellow = watch, green = good)
- Grade entry by tutor or manual import

**Data needed**:
- Subject name
- Grade (letter or percentage)
- Semester/marking period
- Date entered
- Pre-tutoring baseline grade for comparison

### 3. Tutor Session Notes (HIGH PRIORITY)
**Why important**: Communication loop between tutor → parent/student

**Features**:
- Quick note logging after each session
- Structured format: "What we covered" + "Student progress" + "Homework assigned"
- Visible to parent and student immediately
- Searchable/filterable by subject or date
- Ability to flag "student needs extra help"

**Data needed**:
- Session reference (which session these notes are for)
- Free-text notes
- Homework assigned (description + due date)
- Progress flags (struggling/improving/on-track)

### 4. Homework Tracking (MEDIUM PRIORITY)
**Why useful**: Accountability between sessions, helps tutors see if student is practicing

**Features**:
- Homework assignments from tutor
- Due date tracking
- Completion status (not started/in progress/completed)
- Student can mark as complete
- Tutor can see completion rates

**Data needed**:
- Assignment description
- Due date
- Subject
- Completion status
- Optional: file upload for completed work

### 5. Progress Dashboard (MEDIUM PRIORITY)
**Why useful**: High-level overview for quick status checks

**Student view**:
- Upcoming sessions (next 3-5)
- Homework due soon
- Current grades with trend arrows
- Session attendance rate

**Parent view**:
- ROI summary (sessions completed, grades improved)
- Upcoming sessions
- Recent tutor notes (last 3-5)
- Alerts (missed sessions, grade drops)

**Tutor view**:
- Today's sessions
- Students needing attention (grade drops, missed homework)
- Quick session note entry

### 6. Notifications (MEDIUM PRIORITY)
**Why useful**: Proactive communication reduces missed sessions and falling behind

**Notification types**:
- Session reminder (24hr before + 1hr before)
- Session missed (student no-show alert to parent)
- Grade drop alert (C+ → C triggers parent notification)
- Homework overdue (student didn't complete assigned work)
- New tutor notes available (parent notification)

**Delivery methods**:
- Email (primary)
- SMS (optional, if budget allows)
- In-app notifications (when user logs in)

---

## User Workflows

### Workflow 1: Scheduling a Tutoring Session (Parent)
1. Parent logs in → clicks "Schedule Session"
2. Selects student (if they have multiple children)
3. Selects subject needing tutoring
4. Views available tutor time slots
5. Picks a slot → clicks "Confirm"
6. System sends confirmation to student + tutor
7. Session appears on all three calendars

**Time to complete**: < 2 minutes  
**Success metric**: 90% of sessions scheduled without needing support

### Workflow 2: Logging Session Notes (Tutor)
1. Tutor completes session with student
2. Logs in → clicks "Log Session" (or from notification)
3. Form auto-populates with student, subject, date/time
4. Tutor adds:
   - What topics were covered
   - Student's progress/struggles
   - Homework assigned with due date
5. Optional: Flags if student needs additional sessions
6. Clicks "Save"
7. Parent + student see notes immediately

**Time to complete**: < 1 minute  
**Success metric**: 95% of sessions have notes logged within 24 hours

### Workflow 3: Student Checking Dashboard
1. Student logs in (mobile or desktop)
2. Sees dashboard with:
   - Next tutoring session highlighted
   - Homework due before next session
   - Current grades with visual indicators
3. Clicks on homework → marks as completed
4. Clicks on grade → sees trend over time
5. If struggling, clicks "Request Help" → notifies tutor + parent

**Time to complete**: < 30 seconds for quick check  
**Success metric**: Students log in at least 2x per week

---

## Data Model

### Students Table
```
id (UUID)
firstName (string)
lastName (string)
email (string)
gradeLevel (9-12)
sport (string, optional)
parentId (FK to Parents)
createdAt (timestamp)
```

### Parents Table
```
id (UUID)
firstName (string)
lastName (string)
email (string)
phone (string)
createdAt (timestamp)
```

### Tutors Table
```
id (UUID)
firstName (string)
lastName (string)
email (string)
subjectsTaught (array of strings)
availability (JSON - days/times available)
createdAt (timestamp)
```

### TutoringSessions Table
```
id (UUID)
studentId (FK)
tutorId (FK)
subject (string)
scheduledDate (datetime)
durationMinutes (int, default 60)
location (string - address or Zoom link)
status (enum: scheduled, completed, cancelled, no-show)
notesLogged (boolean)
createdAt (timestamp)
```

### SessionNotes Table
```
id (UUID)
sessionId (FK)
tutorId (FK)
topicsCovered (text)
progressNotes (text)
strugglingAreas (text, optional)
homeworkAssigned (text, optional)
needsExtraHelp (boolean)
createdAt (timestamp)
```

### Grades Table
```
id (UUID)
studentId (FK)
subject (string)
grade (string - letter grade or percentage)
semester (string - "Fall 2024", "Spring 2025")
dateEntered (date)
enteredBy (enum: tutor, parent, student, imported)
createdAt (timestamp)
```

### HomeworkAssignments Table
```
id (UUID)
studentId (FK)
sessionNoteId (FK, optional - if assigned during session)
subject (string)
description (text)
dueDate (date)
status (enum: not-started, in-progress, completed)
completedDate (date, optional)
createdAt (timestamp)
```

### Notifications Table
```
id (UUID)
userId (FK - can be student, parent, or tutor)
type (enum: session-reminder, session-missed, grade-drop, homework-overdue, new-notes)
message (text)
read (boolean)
sentAt (timestamp)
```

---

## Key Relationships
```
Parent (1) → (many) Students
Student (1) → (many) TutoringSessions
Tutor (1) → (many) TutoringSessions
TutoringSession (1) → (1) SessionNotes
Student (1) → (many) Grades
Student (1) → (many) HomeworkAssignments
SessionNotes (1) → (many) HomeworkAssignments
```

---

## API Endpoints (Core)

### Authentication
```
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me (current user profile)
```

### Sessions
```
GET /api/sessions (with filters: studentId, tutorId, status, dateRange)
POST /api/sessions (create new session)
PUT /api/sessions/:id (update session)
DELETE /api/sessions/:id (cancel session)
GET /api/sessions/:id/notes (get session notes)
POST /api/sessions/:id/notes (log session notes)
```

### Grades
```
GET /api/students/:id/grades (with filters: subject, semester)
POST /api/grades (add new grade)
PUT /api/grades/:id (update grade)
GET /api/students/:id/grade-trends (for visualization)
```

### Homework
```
GET /api/students/:id/homework (with filters: status, subject)
POST /api/homework (tutor assigns homework)
PUT /api/homework/:id (update status/completion)
```

### Dashboard Data
```
GET /api/dashboard/student/:id (student dashboard data)
GET /api/dashboard/parent/:id (parent dashboard data)
GET /api/dashboard/tutor/:id (tutor dashboard data)
```

### Notifications
```
GET /api/notifications (current user's notifications)
PUT /api/notifications/:id/read (mark as read)
```

---

## Technical Considerations

### Performance
- **Grade trends**: Pre-calculate grade averages nightly, cache results (O(1) lookup vs O(n) calculation)
- **Dashboard queries**: Use database views or materialized queries to avoid N+1 queries
- **Session calendar**: Index on scheduledDate + studentId + tutorId for fast filtering

### Security
- **Role-based access**: Student sees only their data, parent sees their children's data, tutor sees assigned students
- **Session notes**: Only tutor can create, but student + parent can read
- **Grade entry**: Configurable - allow tutors only, or tutors + parents, depending on trust model

### Scalability
- **Notifications**: Use job queue (e.g., Bull/Redis) for sending emails/SMS asynchronously
- **File uploads**: If adding homework file uploads, use S3/cloud storage, not database
- **Real-time updates**: WebSocket for live dashboard updates when tutor logs notes

### Mobile Responsiveness
- **Students check on phones**: Mobile-first design, especially for dashboard + homework list
- **Calendar view**: Switch to list view on mobile (calendar harder to navigate on small screens)
- **Session logging**: Tutor form should be quick-entry on mobile (big buttons, minimal typing)

---

## Integration with Parent Platform

### What We Receive (API or Webhook)
- **Student roster**: List of enrolled students with basic info
- **Parent contact info**: For sending notifications
- **Initial grade data**: Baseline grades before tutoring starts (optional)

### What We Send Back
- **Session completion data**: For billing/invoicing
- **Grade improvement metrics**: Summary stats for their dashboards
- **Attendance records**: Which students are showing up vs no-shows

### Integration Method
- **REST API** with JWT authentication (most flexible)
- **Webhooks** for real-time updates (e.g., when new student enrolls)
- **Batch export** as fallback (nightly CSV export if real-time not feasible)

---

## Design Principles

### Visual Design
- **Card-based layout**: Each subject/session gets its own card for scannability
- **Color coding**: Red (needs help) / Yellow (watch) / Green (on track) for grades
- **Minimal chrome**: Focus on data, not decorative UI elements
- **White space**: Don't cram - use breathing room between sections

### Interaction Design
- **1-click actions**: "Mark homework complete", "Request session", "Log notes" should be single-click
- **Progressive disclosure**: Show summary first, details on click (e.g., grade trends hidden until user clicks grade card)
- **Inline editing**: For session notes, allow editing directly in dashboard vs separate edit page
- **Confirmation for destructive actions**: "Cancel session" requires confirmation

### Information Architecture
- **Role-based navigation**: Student nav != Parent nav != Tutor nav
- **Dashboard as home**: Every user lands on their role-specific dashboard
- **Quick actions**: Persistent buttons for most common tasks (Schedule, Log Session, View Grades)

---

## Success Metrics

### User Engagement
- **Students**: Log in at least 2x per week
- **Parents**: Check dashboard at least 1x per week
- **Tutors**: Log session notes within 24 hours (95% compliance)

### Operational Efficiency
- **Session scheduling**: < 2 minutes from start to confirmed booking
- **Session notes**: < 1 minute to log complete notes
- **Dashboard load time**: < 2 seconds on 4G mobile

### Outcome Metrics
- **Grade improvement**: 70% of tutored subjects show grade increase after 4+ sessions
- **Session attendance**: > 90% of scheduled sessions completed (not cancelled/no-show)
- **Homework completion**: > 80% of assigned homework marked complete by due date

---

## Open Questions & Decisions Needed

### Grade Entry
**Question**: Who enters grades into the system?
- Option A: Tutors manually enter after each grading period
- Option B: Parents enter grades from report cards
- Option C: Import from school SIS (requires integration)
- **Decision needed**: Which option(s) to support in MVP?

### Tutor Assignment
**Question**: How are tutors matched with students?
- Option A: Parent platform pre-assigns tutors (we just display)
- Option B: Students pick from available tutor pool
- Option C: Admin manually assigns based on subject needs
- **Decision needed**: Clarify with parent platform

### Session Scheduling
**Question**: Who initiates scheduling?
- Option A: Parent schedules, tutor auto-confirms
- Option B: Parent requests, tutor must approve
- Option C: Tutor posts availability, parent books available slots
- **Decision needed**: Which flow matches business model?

### Billing Integration
**Question**: Do we track sessions for invoicing?
- Option A: Yes - we send session counts to parent platform for billing
- Option B: No - billing completely separate, we just track for reporting
- **Decision needed**: Confirm with parent platform

### Homework Files
**Question**: Do students upload completed homework?
- Option A: Yes - file upload for tutors to review
- Option B: No - just checkbox for "I completed this"
- **Decision needed**: How important is artifact collection vs tracking?

---

## MVP Scope (Phase 1)

### Must Have
✅ User authentication (student, parent, tutor roles)
✅ Session scheduling (parent initiates)
✅ Session calendar view (all roles)
✅ Session note logging (tutor only)
✅ Grade entry and display (manual entry)
✅ Grade trend visualization (line chart)
✅ Homework assignment creation (tutor)
✅ Homework completion tracking (student marks done)
✅ Basic dashboard for each role
✅ Email notifications (session reminders, grade drops)

### Nice to Have (Phase 2)
- SMS notifications
- File upload for homework
- Tutor availability calendar
- Advanced filtering/search
- Grade import from school SIS
- In-app messaging between roles
- Mobile app (native iOS/Android)

### Explicitly Out of Scope
❌ Video calling (use Zoom/Google Meet links)
❌ Payment processing
❌ NCAA eligibility tracking
❌ College recruiting features
❌ Course curriculum/materials hosting
❌ Group tutoring sessions (only 1-on-1 for now)

---

## Non-Functional Requirements

### Availability
- **Uptime target**: 99% (acceptable for MVP)
- **Maintenance windows**: Weekends, late night (avoid school hours)

### Data Retention
- **Session history**: Keep indefinitely (historical record)
- **Grades**: Keep all historical grades
- **Notifications**: Archive after 90 days

### Compliance
- **FERPA**: Student education records must be protected
- **Data privacy**: Parent consent required for student data access
- **Audit trail**: Log who accessed/modified student records

### Browser Support
- **Desktop**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile**: iOS Safari, Android Chrome (latest 2 versions)
- **No IE11 support**: Too much dev overhead for dying browser

---

## Tech Stack Recommendations

### Frontend
- **Framework**: React (most common, good for dashboards) or Next.js (if need SSR)
- **UI Library**: Tailwind CSS (fast styling) + shadcn/ui (pre-built components)
- **State Management**: React Context or Zustand (simpler than Redux for this scale)
- **Charts**: Recharts or Chart.js (for grade trend visualization)
- **Calendar**: FullCalendar or react-big-calendar

### Backend
- **Framework**: Node.js + Express (if JS-only shop) or Django/FastAPI (if Python)
- **Database**: PostgreSQL (relational data model fits well)
- **Authentication**: JWT tokens with refresh token rotation
- **File Storage**: AWS S3 or Cloudflare R2 (if adding homework uploads)
- **Job Queue**: Bull (Redis-based) for notifications

### DevOps
- **Hosting**: Vercel (frontend) + Railway/Render (backend)
- **Database**: Supabase or Neon (managed Postgres)
- **Monitoring**: Sentry (error tracking) + Plausible/PostHog (analytics)
- **CI/CD**: GitHub Actions

---

## Timeline Estimate (Rough)

### Week 1-2: Foundation
- Database schema + migrations
- Authentication system
- Basic API endpoints
- User role system

### Week 3-4: Core Features
- Session scheduling UI + logic
- Grade entry + display
- Session notes + homework tracking
- Basic dashboards (all 3 roles)

### Week 5-6: Polish
- Email notifications
- Grade trend charts
- Mobile responsiveness
- Bug fixes + testing

### Week 7-8: Integration + Launch
- Connect to parent platform APIs
- User testing with real students/parents/tutors
- Deploy to production
- Monitor + iterate

**Total MVP timeline**: ~8 weeks with 1 full-time developer

---

## Risks & Mitigation

### Risk 1: Parent Platform Integration Delays
**Impact**: Can't launch without student roster data
**Mitigation**: Build mock API first, develop against fake data, swap in real API later

### Risk 2: Low Tutor Adoption (Not Logging Notes)
**Impact**: Parents don't see value, platform unused
**Mitigation**: Make note logging dead simple (< 1 min), send tutor reminders, gamify with streak tracking

### Risk 3: Grade Data Inaccuracy
**Impact**: Wrong grades shown, parents lose trust
**Mitigation**: Clear source attribution ("Entered by Tutor on 2/1/25"), allow corrections, add verification step

### Risk 4: Notification Fatigue
**Impact**: Users ignore/block notifications, miss important alerts
**Mitigation**: Consolidate notifications (1 daily digest vs 10 individual emails), allow notification preferences

---

## Competitive Analysis

### Direct Competitors
**TutorCruncher**: Tutor management software, but no grade tracking integration  
**My Tutor List**: Session scheduling, but no progress dashboards  
**WyzAnt**: Marketplace + scheduling, but generic (not athlete-focused)

### Indirect Competitors
**Google Calendar + Spreadsheets**: Free but requires manual coordination  
**School LMS (Canvas/Schoology)**: Full curriculum, overkill for just tutoring

### Our Differentiation
✅ **Purpose-built for tutoring** (not generic scheduling)  
✅ **Grade improvement visibility** (ROI for parents)  
✅ **Multi-role coordination** (student + parent + tutor all in sync)  
✅ **Lightweight** (no complex features, just what's needed)

---

## Future Enhancements (Post-MVP)

- **AI-powered insights**: "Math grade dropping, recommend 2x sessions/week"
- **Tutor marketplace**: Let students browse/book tutors directly
- **Group sessions**: Support 2-3 students in same subject
- **Progress reports**: Auto-generate monthly PDF reports for parents
- **Gamification**: Badges for homework streaks, grade improvements
- **Video integration**: Embed Zoom directly in platform
- **Mobile app**: Native iOS/Android for push notifications
- **Analytics dashboard**: Admin view of platform-wide metrics

---

## Questions for Stakeholders

Before finalizing this spec, confirm:

1. **What's the relationship with the parent platform?** (White-label embedded? Standalone with SSO? Separate branding?)
2. **How many students in pilot?** (Impacts scaling decisions)
3. **Who pays for the platform?** (Parents directly? Bundled with tutoring? Platform takes cut?)
4. **Are tutors employees or contractors?** (Affects permissions + liability)
5. **What's the go-to-market plan?** (Direct to parents? Through schools? Via recruiting platform?)
6. **Any existing systems to integrate with?** (School SIS? Payment processor? CRM?)
7. **What's the budget?** (Impacts tech stack choices + timeline)
8. **Who's the initial dev team?** (Solo developer? Small team? Agency?)

---

**This context document should be read by Claude Code before implementing any features. It provides the "why" behind product decisions, not just the "what" to build.**
