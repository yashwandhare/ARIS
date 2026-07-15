# IATS Frontend Context

This file is a short reference for the frontend codebase.

## Scope

- React 18 + TypeScript app
- Admin dashboard, candidate portal, and intern portal
- Mock data by default, API-ready structure

## Main Areas

- `src/pages/` for admin routes
- `src/features/intern/portal/` for intern pages
- `src/types/features/candidate/portal/` for candidate portal types and helpers
- `src/components/` for shared UI and layout

## Common Patterns

- Use TanStack Query for server state
- Use React Hook Form and Zod for complex forms
- Keep feature code grouped by route or domain
- Prefer small reusable components over large page files

## Build

```bash
npm install
npm run dev
npm run build
```
