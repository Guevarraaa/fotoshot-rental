# FotoShot System Architecture

## 1. Architecture Overview

FotoShot will use a simple full-stack architecture based on Next.js and Supabase.

```text
Customer Browser
    ↓
Next.js Frontend on Vercel
    ↓
Supabase Auth / Database / Storage
    ↓
Supabase Edge Functions where needed
```

## 2. Main Components

### Frontend

- Next.js app
- Tailwind CSS
- shadcn/ui components
- React Hook Form or equivalent form handling
- Signature pad component
- Upload components
- Calendar component

### Backend

- Supabase Postgres database
- Supabase Auth for admin login
- Supabase Storage for uploaded IDs, billing statements, signatures, and payment proof
- Row Level Security policies
- Edge Functions for secure operations if needed

### Hosting

- Frontend deployed to Vercel
- Backend hosted by Supabase

## 3. Folder Structure

```text
fotoshot-rental/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── hooks/
│   ├── types/
│   └── public/
│
├── backend/
│   ├── sql/
│   ├── rls/
│   ├── edge-functions/
│   ├── migrations/
│   └── seed/
│
├── assets/
│   ├── logo/
│   ├── payment/
│   │   └── qr-codes/
│   ├── cameras/
│   │   ├── canon-eos-m100/
│   │   ├── instax-mini-11/
│   │   └── kodak-pixpro-wpz2/
│   ├── sample-outputs/
│   │   ├── canon-eos-m100/
│   │   ├── instax-mini-11/
│   │   └── kodak-pixpro-wpz2/
│   └── documents/
│       ├── terms-and-conditions/
│       ├── rental-agreement/
│       └── rental-form/
│
├── docs/
├── .gitignore
├── README.md
└── package.json
```

## 4. Data Flow: Booking Submission

```text
Customer fills booking form
    ↓
Frontend validates required fields
    ↓
Files are uploaded to private Supabase Storage
    ↓
Booking record is created in Supabase Database
    ↓
Booking reference number is generated
    ↓
Admin reviews booking in admin panel
```

## 5. Data Flow: Admin Approval

```text
Admin logs in
    ↓
Admin opens booking details
    ↓
Admin checks documents and payment proof
    ↓
Admin marks payment verified
    ↓
Admin approves booking
    ↓
Approved booking blocks calendar availability
```

## 6. Security Model

### Public Users

Can:

- Read public camera data
- Submit booking requests
- Upload files only as part of booking submission
- Track booking using reference number and phone number

Cannot:

- View other bookings
- View private uploaded files
- Access admin dashboard

### Admin

Can:

- View all bookings
- View all uploaded files
- Update booking statuses
- Manage camera availability
- Add admin notes

## 7. Storage Buckets

Recommended buckets:

- `booking-documents` private
- `payment-proofs` private
- `camera-assets` public
- `site-assets` public

## 8. Environment Variables

Frontend environment:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Server-only environment:

```text
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_EMAIL=admin@fotoshot.com
```

Never expose service role keys to the browser.

## 9. Analytics Architecture

Use internal database events instead of Google Analytics.

Track:

- Homepage visits
- Booking started
- Booking submitted
- Most booked camera

Store events in an `analytics_events` table.

## 10. Backup Architecture

- Supabase database backups
- Export SQL schema regularly
- Backup uploaded documents periodically
- Keep a copy of environment variables in a secure password manager
