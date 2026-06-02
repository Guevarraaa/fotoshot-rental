# FotoShot Camera Rental

FotoShot Camera Rental MVP for online camera browsing, booking request intake, manual GCash/Maya payment verification, and admin review.

## Stack

- Frontend: Next.js 15 App Router, TypeScript, Tailwind CSS
- Backend: Supabase Postgres, Auth, and Storage
- Deployment: Vercel

## Structure

```text
frontend/  Next.js application
backend/   Supabase SQL, RLS, migrations, seeds, and future edge functions
assets/    Logo, camera photos, sample outputs, payment QR, and document assets
docs/      Product, business, architecture, and operations documentation
```

## Local Setup

```bash
cd frontend
npm install
npm run dev
```

Create `frontend/.env.local` from `frontend/.env.example` and fill in the Supabase values when the Supabase project is ready.

## Security Notes

- Do not commit `.env.local`.
- Do not hardcode the admin password.
- Do not expose `SUPABASE_SERVICE_ROLE_KEY` to browser code.
- Uploaded renter IDs, billing statements, signatures, and payment screenshots must use private Supabase Storage buckets.

