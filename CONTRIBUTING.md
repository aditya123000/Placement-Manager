# Contributing Guide

## Architecture Principles

- Keep the feature-first structure under `src/features`.
- Put reusable UI primitives in `src/shared/components`.
- Keep API calls centralized in `src/shared/lib/api.js`.
- Keep section-level state orchestration in `src/app/App.jsx`.
- Backend routes should persist through `server/store.js` only.

## Team Conventions

- Create new components for new UI surfaces instead of bloating existing sections.
- Keep component files focused on one responsibility.
- Avoid introducing business logic directly in JSX templates.
- Preserve existing naming style and folder conventions.
- Prefer additive changes that do not break existing student flow.

## Backend Rules

- All mutations must go through `updateState`.
- Add an audit event for coordinator actions affecting students/drives.
- Validate required fields at route boundaries.
- Keep response payloads role-aware and minimal.

## Frontend Rules

- Use role checks (`currentUser.role`) for section gating.
- Keep API calls in `api.js`, never directly in feature components.
- Use derived data with `useMemo` for dashboard/table views.
- Reuse modal and table patterns for consistency.

## Suggested PR Checklist

- Confirm both roles can login and navigate expected sections.
- Verify student operations: apply, wishlist, profile save, resume upload.
- Verify coordinator operations: toggle placement status, create drive, view audits.
- Run `npm run build` before opening PR.
- Include screenshots for major UI changes.
