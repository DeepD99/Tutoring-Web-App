# 🧠 Role-Based Tutoring Booking Platform — Core Design

## 1️⃣ Roles & Responsibilities

### Roles
- **Student**
  - Creates session requests
- **Parent / Guardian**
  - Approves or rejects session requests for their student
  - Can view request history
- **Tutor**
  - Accepts or declines approved requests
  - Delivers tutoring sessions
- **Admin**
  - Full system visibility
  - Can assign tutors, override statuses, and debug workflows

### What Existing Platforms Standardize
- A single source of truth record (session request / booking)
- Role-based views (same object, filtered by permissions)
- Approval gates (roles can only act after prior approvals)

---

## 2️⃣ Minimal State Machine (Implement This First)

Use one status field (enum) plus an audit log.

### Status Enum
- DRAFT (optional)
- PENDING_PARENT_APPROVAL
- REJECTED_BY_PARENT
- APPROVED_BY_PARENT
- PENDING_TUTOR_ACCEPTANCE (optional)
- DECLINED_BY_TUTOR
- CONFIRMED
- CANCELLED
- COMPLETED
- NO_SHOW (optional)

### Allowed Transitions
- **Student**
  - → PENDING_PARENT_APPROVAL (submit)
  - Can cancel before confirmation
- **Parent**
  - PENDING_PARENT_APPROVAL → APPROVED_BY_PARENT | REJECTED_BY_PARENT
- **Tutor**
  - APPROVED_BY_PARENT → CONFIRMED | DECLINED_BY_TUTOR
- **Admin**
  - Can set any status
  - Can override tutor assignment

---

## 3️⃣ Database Tables (Minimal but Real)

### A) users
- id (auth ID)
- role (student | parent | tutor | admin)
- name
- email

### B) families
- id
- name

### C) family_members
- family_id
- user_id
- relationship (student | parent)
- (optional) student_user_id

### D) session_requests (core object)
- id
- student_id
- parent_id (nullable)
- tutor_id (nullable)
- subject / course
- requested_start_time
- duration_minutes
- location_type (online | in_person)
- notes
- status
- created_at
- updated_at

### E) request_events (audit log)
- id
- request_id
- actor_user_id
- event_type (created | approved | rejected | assigned | accepted | declined | cancelled | completed)
- metadata (json)
- created_at

---

## 4️⃣ Row-Level Security & Access Rules

### session_requests — read access
- Student: student_id = auth.uid()
- Parent: parent_id = auth.uid() OR same family as student
- Tutor:
  - tutor_id = auth.uid()
  - OR status = APPROVED_BY_PARENT and tutor is eligible
- Admin: full access

### session_requests — update rules
- Student:
  - Own requests only
  - Status in (DRAFT, PENDING_PARENT_APPROVAL)
  - Can cancel
- Parent:
  - Can update only PENDING_PARENT_APPROVAL
- Tutor:
  - Assigned requests only
  - Correct status only
- Admin:
  - Can update anything

---

## 5️⃣ API Endpoints

### Student
- POST /requests
- GET /requests?mine=true
- POST /requests/:id/cancel

### Parent
- GET /requests?pendingApproval=true
- POST /requests/:id/approve
- POST /requests/:id/reject

### Tutor
- GET /requests?assignedToMe=true
- POST /requests/:id/accept
- POST /requests/:id/decline

### Admin
- GET /requests
- POST /requests/:id/assign-tutor
- POST /requests/:id/override-status

Each endpoint:
- validates role + relationship
- validates current status
- updates status
- inserts a request_events row

---

## 6️⃣ Required Pages (MVP)

### Auth / Onboarding
- /login
- /onboarding

### Student
- /student/new-request
- /student/requests
- /student/request/:id

### Parent
- /parent/approvals
- /parent/requests
- /parent/request/:id

### Tutor
- /tutor/requests
- /tutor/request/:id

### Admin
- /admin/requests
- /admin/request/:id

---

## 7️⃣ Notifications

Event-driven via request_events.

### Triggers
- created → notify parent
- approved / rejected → notify student
- assigned → notify tutor
- accepted / declined → notify student + parent + admin

---

## 8️⃣ Tutor Matching Model

### MVP
- Admin manually assigns tutor
- Sets tutor_id
- Tutor sees approved request

### Later
- Auto-match by subject, grade, availability

---

## 9️⃣ Core Rule (Implementation Spec)

All booking actions are status transitions.  
All transitions write an event.

For any request mutation:
- validate role
- validate family relationship
- validate current status
- update status
- insert into request_events

---

## 🎓 Product Summary

You’re building a role-based tutoring and academic support platform for middle- and high-school students (grades 9–12), offering help across English Language Arts (including Honors and AP), mathematics from pre-algebra through AP Calculus AB/BC, science (biology, chemistry, physics), and core social studies. Each tutoring session follows a structured approval chain: a student submits a request, a parent or guardian approves or rejects it, a tutor accepts and delivers the session, and an admin oversees matching, compliance, and quality. The platform enforces permissions, visibility, and state transitions at the system level.
