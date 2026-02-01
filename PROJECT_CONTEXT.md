# PROJECT CONTEXT

## Platform Purpose
Athletic academic tracking platform for high school student-athletes pursuing D1/D2/D3 collegiate sports. Integrates tutoring progress with NCAA eligibility requirements and target school admission standards.

## Core User Journeys

### Student Athlete
1. Logs in → sees NCAA eligibility status immediately
2. Checks gap between current GPA and target school requirements
3. Views upcoming tutoring sessions and assignments
4. Tracks grade improvements semester-over-semester
5. Monitors recruiting timeline milestones

### Tutor
1. Logs student's session notes and homework
2. Sees which subjects are blocking NCAA eligibility
3. Gets alerts when student is falling behind target school requirements

### Parent
1. Views high-level academic progress (GPA trend, eligibility status)
2. Sees tutoring session attendance and effectiveness
3. Monitors progress toward target schools

### Coach (Optional)
1. Checks academic eligibility for games/tournaments
2. Verifies NCAA clearinghouse status

## Critical Data Points

### NCAA Eligibility Metrics
- Core course GPA (16 courses: 4 English, 3 Math, 2 Science, etc.)
- SAT/ACT scores (sliding scale based on GPA)
- Amateurism certification status
- Clearinghouse registration status

### Target School Requirements
- Minimum GPA for each target school
- Specific course requirements (some schools require 4 years of language)
- Early decision/signing day deadlines
- Scholarship offer status

### Tutoring Performance
- Sessions attended vs scheduled
- Before/after grades per subject
- Subjects currently being tutored
- Tutor recommendations/notes

### Academic Progress
- Current GPA (overall + core courses)
- Grade trends per subject
- Semester-by-semester comparison
- Projected GPA at graduation

## Design Principles
[Keep your existing principles about explaining logic, tradeoffs, etc.]

## Tech Stack
[Your current stack]

## Key Differentiators from Standard LMS
- NCAA eligibility is PRIMARY metric, not overall GPA
- Target school comparison (not generic grade tracking)
- Tutoring ROI visibility (before/after analysis)
- Multi-stakeholder access (student, parent, tutor, coach)
- Recruiting timeline integration
```

## Data Model Changes

**New tables/collections you'll need**:
```
students
- id
- name
- sport
- graduationYear
- ncaaEligibilityStatus

targetSchools (many-to-many with students)
- studentId
- schoolName
- division (D1/D2/D3)
- minGPA
- minSAT/ACT
- status (reach/target/safety)
- applicationDeadline

tutoringHistory
- studentId
- tutorId
- subject
- sessionDate
- notesFromTutor
- assignedHomework

ncaaRequirements
- studentId
- coreCourseGPA
- satScore
- actScore
- clearinghouseStatus
- amateurismStatus

gradeHistory (enhanced)
- studentId
- subject
- grade
- semester
- isCoreCourse (boolean - for NCAA tracking)
```

## API Endpoints to Add
```
GET /api/students/:id/ncaa-eligibility
GET /api/students/:id/target-schools
GET /api/students/:id/gap-analysis
GET /api/students/:id/tutoring-sessions
POST /api/tutoring-sessions (for tutors to log notes)
GET /api/students/:id/recruiting-timeline
```

## Updated Dashboard Wireframe
```
+--------------------------------------------------+
| Welcome, [Name] - [Sport] | Class of [Year]      |
+--------------------------------------------------+
| 🎯 NCAA ELIGIBILITY STATUS                        |
| Core GPA: 3.2 ✅ | SAT: 1180 ⚠️ | Clearinghouse: ✅|
| Status: ELIGIBLE for D1/D2/D3                     |
+--------------------------------------------------+
| 📊 TARGET SCHOOLS GAP ANALYSIS                    |
| 🟢 Texas A&M (3.0 req) - QUALIFIED               |
| 🟡 LSU (3.3 req) - 0.1 away (Need A in Math)    |
| 🔴 Alabama (3.5 req) - 0.3 away (2 semesters)   |
+--------------------------------------------------+
| 📚 TUTORING PROGRESS                              |
| Next Session: Tomorrow 4pm - Math (Mr. Johnson) |
| Recent Improvement: English C+ → B (3 sessions)  |
| Current Focus: Algebra II (blocking LSU req)     |
+--------------------------------------------------+
| 📈 ACADEMIC PROGRESS                              |
| Current GPA: 3.2 (↑ from 3.0 last semester)     |
| Core Course GPA: 3.1 (NCAA requirement: 2.3 ✅)  |
| Semester Trend: [Visual graph showing upward]    |
+--------------------------------------------------+
| 🏈 RECRUITING TIMELINE                            |
| Next Milestone: Junior Year Transcripts Due      |
| Official Visit Window Opens: Sept 1              |
| Early Signing Period: Nov 13-20                  |
+--------------------------------------------------+
