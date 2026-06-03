# FotoShot Codex Workflow Memory

Use this file first when continuing work on the FotoShot Camera Rental MVP.

## Project

- Project name: `fotoshot-rental`
- Business name: FotoShot
- Contact: `+639128494056`
- Instagram: `@thefoto.shot`
- Facebook: `@Foto.Shot`
- GCash/Maya number: `09670141817`
- GCash/Maya name: `Shayra Mae Aquino`
- Admin email used for Supabase Auth: `admin@fotoshot.com`

## Tech Stack

- Frontend: Next.js 15 App Router
- Styling: Tailwind CSS
- Backend: Supabase
- Database: PostgreSQL through Supabase
- Auth: Supabase Auth
- Storage: Supabase Storage
- Deployment: Vercel
- Payment: manual GCash/Maya screenshot upload, no payment gateway

## Repo Structure

```text
fotoshot-rental/
├── frontend/
├── backend/
│   ├── sql/06-supabase-schema.sql
│   ├── rls/07-rls-policies.sql
│   ├── edge-functions/
│   ├── migrations/
│   └── seed/
├── assets/
├── docs/
├── .gitignore
└── README.md
```

## Current Status

Completed:

- Next.js 15 app scaffolded in `frontend/`
- Responsive public layout
- Homepage
- Camera catalog
- Camera detail pages
- Booking form UI
- Required renter fields
- Upload fields showing selected filenames
- Terms/agreement checkbox UI
- Payment instruction section
- Payment screenshot field UI
- Track booking placeholder
- Admin login with Supabase Auth
- Protected admin dashboard
- Admin logout button
- Vercel deployment working
- Supabase schema and RLS applied
- Supabase storage buckets created
- Public booking insert without file upload works
- Booking success shows reference number

Important current limitation:

- File upload fields are UI-only right now. They intentionally do not submit files through the Server Action because large files exceed the Server Action body limit.
- Public select policies were added for MVP testing so `.insert().select("id")` works. Before real launch, replace booking creation with a secure RPC/server route.

## Local Commands

Run from frontend:

```powershell
cd D:\rafael-dev\fotoshot-rental\frontend
npm run dev
npm run lint
npm test
npm run build
```

Run git commands from project root:

```powershell
cd D:\rafael-dev\fotoshot-rental
git status
git add .
git commit -m "Message here"
git push
```

## Environment Variables

Local env file:

```text
frontend/.env.local
```

Expected format:

```env
NEXT_PUBLIC_SUPABASE_URL=https://oqzwpmgekdfdkwtvneek.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=anon_public_key_here

SUPABASE_SERVICE_ROLE_KEY=
ADMIN_EMAIL=admin@fotoshot.com
```

Vercel env vars:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Do not paste or commit `SUPABASE_SERVICE_ROLE_KEY`.

## Vercel Settings

- Repository: `Guevarraaa/fotoshot-rental`
- Root Directory: `frontend`
- Framework Preset: Next.js
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: default/blank

Live site:

```text
https://fotoshot-rental.vercel.app
```

## Supabase Setup

Schema file:

```text
backend/sql/06-supabase-schema.sql
```

RLS file:

```text
backend/rls/07-rls-policies.sql
```

Storage buckets:

```text
camera-assets       public
site-assets         public
booking-documents   private
payment-proofs      private
```

Admin setup:

- Supabase Auth user: `admin@fotoshot.com`
- Matching row in `public.admin_profiles`
- `admin_profiles.id` must match the Supabase Auth user UUID exactly.

## Camera IDs

```text
canon-eos-m100 = ed46aa6b-60cf-4909-94e7-1fb1abab7e02
instax-mini-11 = 2162dd1a-e8f9-483d-9002-8e85702462ea
kodak-pixpro-wpz2 = b6b6452c-0c3c-467d-a1d2-105477bbbeca
```

These IDs are stored in:

```text
frontend/lib/constants.ts
```

## Current Booking Flow

Current working flow:

1. Customer fills `/book`.
2. Server Action inserts into `customers`.
3. Server Action inserts into `bookings`.
4. Server Action inserts into `emergency_contacts`.
5. Server Action inserts into `student_information`.
6. Booking status starts as `pending_review`.
7. Payment status starts as:
   - `payment_submitted` for GCash/Maya
   - `cash_pending` for cash
8. Success screen shows reference number like `FS-2026-1234`.

Current file behavior:

- Upload fields display selected filenames.
- Upload files are not sent to Supabase Storage yet.
- `FileUploadField` uses `data-upload-name`, not `name`, so files do not enter the Server Action payload.

## Useful Supabase Checks

Latest bookings:

```sql
select reference_number, booking_status, payment_status, total_amount, created_at
from public.bookings
order by created_at desc
limit 5;
```

Latest customers:

```sql
select full_name, contact_number, created_at
from public.customers
order by created_at desc
limit 5;
```

Camera IDs:

```sql
select id, slug, name
from public.cameras
order by name;
```

Policies:

```sql
select schemaname, tablename, policyname, cmd, roles
from pg_policies
where schemaname = 'public'
order by tablename, policyname;
```

## Business Rules

- Standard rental period: 23 hours
- Pickup: 11:00 AM
- Return: next day by 10:00 AM
- Late fee: PHP 70/hour after 10:00 AM
- Must return camera fully charged
- Items reserved only after full payment is received and admin approved
- Pending bookings do not block calendar
- Only paid + approved/reserved/released bookings block availability
- Pending bookings expire after 24 hours
- Cancellation refund: 30% only
- No refunds for early returns or no-shows
- No meetups
- Weekday pickup/return: BIR RDO-19, Subic Bay Freeport Zone, 8AM-5PM only
- Weekend pickup/return: 4 Sampaguita Street, Purok 5, New Cabalan, Olongapo City

## Camera Pricing

Canon EOS M100:

- PHP 549/day for 1-3 days
- PHP 499/day for 4+ days
- Deposit: PHP 1,000
- Inclusions: Micro SD Card, Charger, Battery, OTG Card Reader for iPhone/Type-C, Camera Bag, Cleaning Kit, Camera Lens Cap

Instax Mini 11:

- PHP 249/day for 1-3 days
- PHP 199/day for 4+ days
- Deposit: PHP 1,000
- Inclusions: Battery, Camera Bag, Cleaning Kit
- Add-on: Instax Film, PHP 550 per box, 10 pcs

Kodak Pixpro WPZ2:

- PHP 399/day for 1-3 days
- PHP 349/day for 4+ days
- Deposit: PHP 1,000
- Inclusions: Micro SD Card, Charger, Battery, OTG Card Reader for iPhone/Type-C, Camera Bag

## Required Uploads

- Valid government ID 1
- Valid government ID 2
- Selfie holding valid ID
- Specimen signature 1
- Specimen signature 2
- Specimen signature 3
- Billing statement/proof of address 1
- Billing statement/proof of address 2
- Billing statement/proof of address 3
- Payment screenshot for GCash/Maya

## Recommended Next Milestones

### 1. Admin Dashboard Real Data

Replace placeholder dashboard with real Supabase data:

- Count pending bookings
- Count payment submitted
- Count approved bookings
- Show latest bookings table
- Keep admin auth protection

### 2. Admin Booking Details Page

Create:

```text
frontend/app/admin/bookings/[id]/page.tsx
```

Show:

- booking summary
- renter info
- emergency contact
- student info
- payment status
- booking status
- admin placeholders for uploaded files

### 3. File Upload Integration

Do not send files through regular Server Action payload.

Recommended approach:

- Create booking first.
- Upload files from client directly to Supabase Storage using controlled paths.
- Insert metadata into `booking_files`.
- Use private buckets:
  - `booking-documents`
  - `payment-proofs`

### 4. Admin Status Actions

Add admin actions:

- mark payment verified
- approve
- reject
- mark released
- mark returned
- mark completed
- cancel

### 5. Track Booking

Build secure status lookup:

- input reference number
- input phone number
- return safe customer-facing status
- do not expose private file URLs

## Development Rules

- Read docs first before major changes.
- Keep changes small and verify with:

```powershell
npm run lint
npm test
npm run build
```

- Commit after working milestones.
- Do not commit `.env.local`.
- Do not hardcode admin passwords.
- Do not expose service role keys.
- Prefer guiding user step-by-step unless user explicitly asks Codex to edit directly.

