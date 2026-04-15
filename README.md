# Placement Manager

Placement Manager is now a lightweight full-stack campus placement workflow platform. It combines a React frontend with a Node.js/Express API so the project can demonstrate realistic placement operations instead of only browser-local demo state.

## Highlights

- Student authentication with local persistence
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
```

## Production-Ready Upgrade Path

This repo now includes a local development backend. To take it fully production-ready, the next logical additions are:

1. Node.js/Express or NestJS backend with PostgreSQL or MongoDB
2. Real authentication with JWT or session-based auth
3. Role-based access for students, coordinators, recruiters, and admins
4. Resume/document uploads with cloud object storage
5. Email/SMS notifications for shortlist and interview updates
6. Audit logs, exports, and reporting APIs
7. Unit, integration, and end-to-end tests
8. CI/CD pipeline and environment-based configuration

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
