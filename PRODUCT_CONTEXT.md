# Product Context

## Platform Purpose
Tutoring management and academic progress tracking platform for high school student-athletes. Helps students, parents, and tutors coordinate tutoring sessions and monitor grade improvement to meet college admission requirements.

**Key Distinction**: We do NOT handle NCAA eligibility, recruiting, or college matching. A parent platform handles that. We focus ONLY on tutoring coordination and academic improvement.

## Target Users
- **Primary**: High school student-athletes (grades 9-12) receiving tutoring
- **Secondary**: Parents (schedule sessions, monitor progress, pay for tutoring)
- **Tertiary**: Tutors (log sessions, track student improvement, assign homework)

## Core Problem Being Solved
Student-athletes getting tutored need:
1. Easy scheduling of tutoring sessions
2. Visibility into which subjects need focus
3. Proof that tutoring is improving grades (ROI for parents)
4. Assignment tracking between tutoring sessions
5. Communication channel between student, tutor, and parent

Current solutions are either too generic (Google Calendar + email) or too complex (full LMS platforms). We're purpose-built for 1-on-1 tutoring coordination.

## Key User Journeys

### Student Athlete
1. Logs in → sees upcoming tutoring sessions
2. Views current grades and subjects needing improvement
3. Completes homework assigned by tutor
4. Requests additional tutoring sessions in struggling subjects
5. Tracks grade trends over time

### Tutor
1. Views assigned students and upcoming sessions
2. Logs session notes after each meeting (what was covered, student progress)
3. Assigns homework/practice problems for student to complete before next session
4. Flags subjects where student is struggling and needs more sessions
5. Sees student's grade history to measure tutoring effectiveness

### Parent
1. Schedules new tutoring sessions for their student
2. Views session attendance (did student show up?)
3. Sees grade improvement trends (is tutoring working?)
4. Reviews tutor notes from recent sessions
5. Gets notifications when grades drop or sessions are missed

## Critical Metrics (Priority Order)

### 1. Tutoring Session Management
- Upcoming sessions (date, time, subject, tutor)
- Session history (attended vs missed)
- Session notes from tutor
- Homework completion status

### 2. Grade Tracking
- Current grades by subject
- Grade trends over time (semester-by-semester)
- Before/after tutoring comparison (did grade improve?)
- Subjects flagged as "needs improvement"

### 3. Tutoring Effectiveness (ROI)
- Sessions completed per subject
- Grade change since tutoring started
- Homework completion rate
- Tutor recommendations/alerts

### 4. Communication
- Tutor notes visible to parent and student
- Alerts for missed sessions
- Requests for additional sessions
- Progress updates

## Dashboard Layout (Student View)
```
+--------------------------------------------------+
| Welcome, [Name]! | [Sport] | Grade [X]            |
+--------------------------------------------------+
| 📅 UPCOMING TUTORING SESSIONS                     |
| TODAY 4:00 PM - Math with Mr. Johnson            |
| Tomorrow 3:30 PM - English with Ms. Smith        |
| [Request More Sessions]                          |
+--------------------------------------------------+
| 📊 CURRENT GRADES                                 |
| Math: C+ (⚠️ needs improvement)                  |
| English: B (↑ improved from C+)                  |
| Science: A- (✅ on track)                        |
| History: B+ (→ stable)                           |
+--------------------------------------------------+
| ✏️ HOMEWORK DUE                                   |
| Math: Practice problems 1-15 (Due before session)|
| English: Essay outline (Due Thursday)            |
+--------------------------------------------------+
| 📈 PROGRESS OVERVIEW                              |
| Sessions this month: 8/8 attended                |
| Grades improved: 2 subjects ↑                    |
| Homework completion: 85%                         |
+--------------------------------------------------+
```

## Dashboard Layout (Parent View)
```
+--------------------------------------------------+
| [Student Name]'s Progress | [Month] Overview     |
+--------------------------------------------------+
| 💰 TUTORING ROI                                   |
| Sessions this month: 8 ($480)                    |
| Grades improved: Math C+ → B, English C+ → B     |
| ROI: 2 grades improved in 1 month               |
+--------------------------------------------------+
| 📅 UPCOMING SESSIONS                              |
| This week: 3 sessions scheduled                  |
| Next available: Tomorrow 4pm (Math)              |
| [Schedule New Session]                           |
+--------------------------------------------------+
| 📝 RECENT TUTOR NOTES                             |
| Math (Yesterday): "Working on quadratic equations|
| - showed good progress, assign 10 practice probs"|
| English (Monday): "Essay structure improved..."  |
+--------------------------------------------------+
| ⚠️ ALERTS                                         |
| • Math grade at C+ - recommend 2 sessions/week   |
| • Student missed homework assignment (English)   |
+--------------------------------------------------+
```

## Dashboard Layout (Tutor View)
```
+--------------------------------------------------+
| My Students | [Date]                              |
+--------------------------------------------------+
| 📋 TODAY'S SESSIONS                               |
| 4:00 PM - John Smith (Math - Algebra II)        |
| 5:30 PM - Sarah Jones (English - Essay Writing) |
+--------------------------------------------------+
| 👥 ASSIGNED STUDENTS (5)                          |
| John Smith - Math (8 sessions, grade C+ → B)    |
| Sarah Jones - English (4 sessions, grade B)     |
| [View all students]                              |
+--------------------------------------------------+
| ✏️ LOG SESSION NOTES                              |
| Student: [Dropdown]                              |
| Subject: [Dropdown]                              |
| What we covered: [Text area]                     |
| Homework assigned: [Text area]                   |
| Progress notes: [Text area]                      |
| [Save Notes]                                     |
+--------------------------------------------------+
| 🚨 STUDENTS NEEDING ATTENTION                     |
| • John Smith - Math grade dropped to C           |
| • Mike Brown - Missed last 2 sessions            |
+--------------------------------------------------+
```

## Data Model

### Core Entities
- **Students** (name, grade level, sport, current GPA)
- **Tutors** (name, subjects taught, availability)
- **Tutoring Sessions** (student, tutor, subject, date/time, status, notes)
- **Grades** (student, subject, grade, semester, date entered)
- **Homework Assignments** (student, subject, description, due date, completed)

### Key Relationships
- Student → many Tutoring Sessions
- Student → many Grades
- Student → many Homework Assignments
- Tutor → many Tutoring Sessions
- Tutoring Session → one Subject
- Subject → many Grades (to track improvement)

## Features NOT to Build

❌ NCAA eligibility tracking (parent platform handles this)
❌ College recruiting/matching (parent platform handles this)
❌ Athletic performance tracking (not our focus)
❌ Test prep (SAT/ACT) unless specifically for tutoring
❌ Course materials/curriculum (tutors bring their own)
❌ Payment processing (assume parent platform handles billing)
❌ Video calling for remote tutoring (use Zoom/Google Meet links)

## Features TO Build

✅ Session scheduling and calendar management
✅ Session attendance tracking (did student show up?)
✅ Tutor session notes and logging
✅ Grade entry and trend visualization
✅ Homework assignment tracking
✅ Before/after grade comparison per subject
✅ Parent notifications (missed sessions, grade drops)
✅ Tutor availability management
✅ Multi-role dashboards (student/parent/tutor see different views)

## Integration Points with Parent Platform

**We receive from parent platform**:
- Student roster (who's enrolled)
- Student profiles (name, grade, sport)
- Parent contact info (for notifications)

**We send to parent platform**:
- Session completion data (for billing)
- Grade improvement metrics (for their dashboards)
- Attendance records (for accountability)

**Integration method**: TBD - likely REST API or webhook

## Competitive Positioning

**vs Wyzant/Tutor.com**: They focus on finding tutors. We assume tutors are already assigned and focus on coordination + progress tracking.

**vs Google Calendar + Spreadsheets**: We're purpose-built for tutoring with grade tracking, not generic scheduling.

**vs Full LMS (Canvas/Blackboard)**: We're lightweight - just tutoring sessions and grades, not full curriculum management.

**Unique Value**: "Dead-simple tutoring coordination with grade improvement visibility for parents."

## Tech Stack Considerations

- **Real-time updates**: When tutor logs notes, parent sees them immediately
- **Mobile-first**: Students check homework on phones between classes
- **Multi-role auth**: Student/parent/tutor login with different permissions
- **Calendar integration**: Export sessions to Google Calendar/iCal
- **Notification system**: Email/SMS for missed sessions, grade drops
- **Simple scheduling**: Click-to-schedule, no complex availability algorithms

## Success Metrics

**For Students**: 
- Session attendance rate > 90%
- Homework completion rate > 80%
- Grade improvement in tutored subjects

**For Parents**:
- Clear visibility into tutoring ROI
- Easy scheduling (< 2 minutes to book session)
- Proactive alerts before problems escalate

**For Tutors**:
- Session notes logged in < 1 minute
- Easy access to student grade history
- Clear view of which students need more help

## User Flow Examples

### Booking a Session (Parent)
1. Click "Schedule Session"
2. Select student (if multiple children)
3. Select subject
4. See available tutor times
5. Pick time slot
6. Confirm → session added to all calendars

### Logging a Session (Tutor)
1. After session ends, click "Log Session"
2. Auto-populated with student, subject, date/time
3. Add notes: "We covered X, student struggled with Y"
4. Assign homework: "Complete problems 1-10"
5. Flag if student needs additional sessions
6. Save → parent and student see notes immediately

### Checking Progress (Student)
1. Log in → see dashboard
2. View upcoming sessions
3. Check homework due
4. See current grades with trend arrows
5. Request help if struggling

## Open Questions

1. **Tutor assignment**: Does parent platform assign tutors, or do we handle matching?
2. **Scheduling**: Do tutors set their own availability, or is it managed externally?
3. **Grade entry**: Who enters grades - tutors, students, or imported from school SIS?
4. **Billing integration**: Do we need to track session counts for invoicing?
5. **Session format**: In-person only, virtual only, or both?
6. **Homework**: Just tracking completion, or do we need file upload for assignments?
