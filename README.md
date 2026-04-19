# Placify

Placify is a lightweight full-stack campus placement workflow platform. It combines a React frontend with a Node.js/Express API so the project can demonstrate realistic placement operations instead of only browser-local demo state.

## Highlights

- Student authentication with local persistence
- Role-aware access for students and placement coordinators
- Rich student profile with academic, contact, resume, skills, and readiness fields
- On-campus drive management with eligibility checks and placement-rule enforcement
- Application tracker with status, stages, recruiter info, and next-step dates
- Off-campus opportunity board
- Analytics dashboard with coordinator-style metrics
- Resume upload and parsing with extracted skills, CGPA, and project highlights
- Smart eligibility engine with company match scores
- Real-time in-app notifications through server-sent events
- Wishlist / saved companies
- Placement calendar for tests and interview schedules
- Placement operations console with student status actions, drive creation, and audit trail
- Placement preparation hub
- Policy, privacy, and compliance sections
- Resource center and visible project tech stack

## Tech Stack

- React 18
- Vite 5
- Node.js + Express
- Multer for resume uploads
- PDF parsing with `pdf-parse`
- JavaScript (ES Modules)
- CSS for responsive UI architecture
- Local JSON persistence for development data
- Feature-first component organization

## Project Structure

```text
src/
  app/
  features/
    calendar/
    analytics/
    applications/
    auth/
    dashboard/
    drives/
    notifications/
    offCampus/
    placement/
    policy/
    preparation/
    profile/
    resources/
  shared/
    components/
    layout/
    lib/
    styles/
server/
  index.js
  placement.js
  store.js
  data/
src/features/
  operations/
    components/

## Demo Credentials

- Student: `Demo Student` / `demo`
- Coordinator: `Placement Coordinator` / `coord`

## What Is Now Production-Grade

- Role-based workspace flows with separate student and coordinator navigation
- Coordinator operations for updating student placement status
- Coordinator drive-creation workflow from UI to persistent backend
- Persistent audit trail (`state.audits`) for traceability and handovers
- Feature-first frontend modules with reusable operation subcomponents
- Team-friendly conventions documented in `CONTRIBUTING.md`
```

## Production-Ready Upgrade Path

This repo now includes a local development backend. To take it fully production-ready, the next logical additions are:

1. Replace plaintext passwords with hashed credentials and token/session auth
2. Move persistence from local JSON to PostgreSQL with migrations
3. Add recruiter and admin roles with scoped permissions
4. Add request validation and centralized API error middleware
5. Add cloud object storage + antivirus scanning for document uploads
6. Add automated tests: unit, integration, and end-to-end
7. Add CI/CD checks (lint, test, build) and preview deployments
8. Add observability stack (structured logs, tracing, health alerts)

## Getting Started

Start the backend:

```bash
npm run server
```

Start the frontend:

```bash
npm run dev
```

Production build:

```bash
npm run build
```
