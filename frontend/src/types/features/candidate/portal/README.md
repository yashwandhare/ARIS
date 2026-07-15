# Candidate Portal

Implementation notes for the public application flow at `/apply`.

## Structure

- `CandidatePortalPage.tsx` is the entry page
- `components/` holds the form sections
- `hooks/` holds form state helpers
- `schemas/` contains Zod validation
- `services/` contains GitHub validation and submission logic

## Core Flow

1. Candidate selects a role
2. Candidate fills out the multi-section form
3. GitHub URL and file validation run on input
4. Submission creates a payload with application data
5. Success screen shows the application result

## Validation

- Zod handles schema validation
- GitHub URL checks are debounced
- Resume uploads are PDF-only and size-limited
- Inputs are trimmed and normalized before submit

## Config

- Role options live in `constants.ts`
- Application schema lives in `schemas/applicationSchema.ts`
- Submission logic lives in `services/submitApplication.ts`

## Run

```bash
npm install
npm run dev
```
