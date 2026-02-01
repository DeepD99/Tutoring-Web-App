# Product Context

## Platform Purpose
Athletic academic tracking platform for high school student-athletes pursuing D1/D2/D3 collegiate sports. Integrates tutoring progress with NCAA eligibility requirements and target school admission standards.

## Target Users
- **Primary**: High school student-athletes (grades 9-12)
- **Secondary**: Parents (monitor progress, pay for platform)
- **Tertiary**: Tutors (log sessions, track improvement)
- **Optional**: High school coaches (verify eligibility)

## Core Problem Being Solved
Student-athletes need to maintain specific GPAs to:
1. Meet NCAA eligibility requirements (varies by division)
2. Qualify for target colleges they're being recruited by
3. Justify ongoing investment in tutoring

Current solutions (NCSA, BeRecruited) focus on athletic recruiting but provide minimal academic tracking. We're academic-first with recruiting context.

## Key User Journeys

### Student Athlete
1. Logs in → sees NCAA eligibility status immediately
2. Checks gap between current GPA and target school requirements
3. Views upcoming tutoring sessions and assignments
4. Tracks grade improvements semester-over-semester
5. Monitors recruiting timeline milestones

### Tutor
1. Logs session notes and homework assignments
2. Sees which subjects are blocking NCAA eligibility
3. Gets alerts when student is falling behind target school requirements

### Parent
1. Views high-level academic progress (GPA trend, eligibility status)
2. Sees tutoring session attendance and ROI
3. Monitors progress toward target schools

## Critical Metrics (Priority Order)

### 1. NCAA Eligibility Status
- Core course GPA (16 specific courses)
- SAT/ACT scores (sliding scale)
- Clearinghouse registration status
- Amateurism certification

### 2. Target School Requirements
- Minimum GPA for each school
- Course-specific requirements
- Application/signing deadlines
- Current qualification status (qualified/close/far)

### 3. Tutoring Effectiveness
- Sessions attended vs scheduled
- Before/after grades per subject
- Grade improvement velocity
- Cost per GPA point gained

### 4. Academic Progress
- Current GPA (overall + core courses only)
- Semester-over-semester trends
- Projected GPA at graduation
- Grade distribution by subject

## Dashboard Layout (Wireframe)

[Insert the wireframe from my previous response]

## Data Model

### Core Entities
- Students (with sport, graduation year, NCAA status)
- Target Schools (many-to-many with students)
- Tutoring Sessions (timestamped, with notes)
- Grades (flagged if core course for NCAA)
- NCAA Requirements (clearinghouse status, test scores)

### Key Relationships
- Student → many Target Schools
- Student → many Tutoring Sessions
- Student → many Grades
- Tutoring Session → one Subject → related to Grades

## Features NOT to Build

❌ Social/messaging between students (not a social platform)
❌ Athletic performance tracking (40-yard dash, etc.)
❌ Study groups or peer collaboration (1-on-1 tutoring model)
❌ Generic achievement badges (focus on recruiting milestones)
❌ In-platform course materials (students use their school's LMS)

## Competitive Positioning

**vs NCSA/BeRecruited**: They're athletic profile + basic GPA check. We're deep academic tracking with NCAA compliance.

**vs Traditional Tutoring Platforms**: They track sessions. We track sessions + NCAA eligibility + recruiting outcomes.

**Unique Value**: "The only platform that shows if you're academically eligible for the schools recruiting you."

## Tech Stack Considerations

- Real-time updates (when tutor logs session, parent sees it immediately)
- Multi-role authentication (student/parent/tutor see different views)
- Mobile-first (students check between classes/practices)
- Potential integrations: NCAA Eligibility Center, College Board, school SIS

## Open Questions

1. What sports are we targeting first? (Football/basketball = different recruiting timelines)
2. What grade levels? (Freshmen vs seniors have different urgency)
3. In-house tutors or external integrations?
4. Revenue model? (Subscription? Per-session? School partnerships?)
5. Do we handle tutor scheduling or just tracking?
