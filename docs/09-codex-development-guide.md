# FotoShot Codex Development Guide

## 1. Development Goal

Build a production-ready MVP for FotoShot Camera Rental using the documentation in this repository as the source of truth.

## 2. Technology Requirements

Use:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase
- Supabase Auth
- Supabase Storage
- Supabase Postgres

Do not use:

- Hardcoded admin passwords
- Public storage for customer IDs
- Client-side service role keys
- Unvalidated file uploads

## 3. Coding Standards

- Use TypeScript everywhere.
- Create reusable components.
- Keep forms strongly typed.
- Use server-side validation.
- Keep business logic in `lib/` or server actions.
- Keep UI components small.
- Use clear naming.
- Add helpful comments only where logic is not obvious.

## 4. Suggested Frontend Structure

```text
frontend/
├── app/
│   ├── page.tsx
│   ├── cameras/
│   ├── book/
│   ├── track/
│   └── admin/
├── components/
│   ├── public/
│   ├── booking/
│   ├── admin/
│   └── ui/
├── lib/
│   ├── supabase/
│   ├── pricing.ts
│   ├── availability.ts
│   ├── validation.ts
│   └── constants.ts
├── hooks/
├── types/
└── public/
```

## 5. Development Order

1. Project setup
2. Supabase client setup
3. Database schema and seed data
4. Public homepage
5. Camera catalog
6. Camera details
7. Booking form without upload
8. Upload system
9. Signature pad
10. Payment QR and screenshot upload
11. Booking submission
12. Admin auth
13. Admin bookings table
14. Booking details page
15. Admin actions
16. Track booking page
17. Testing and polish

## 6. Important Business Rules

- Only approved/paid bookings block calendar availability.
- Pending bookings expire after 24 hours.
- Full payment is required to reserve a slot.
- Late fee is ₱70/hour after 10:00 AM.
- Standard rental period is 23 hours.
- No meetups.
- Pickup/return locations depend on weekday/weekend.

## 7. Validation Requirements

Booking cannot be submitted unless:

- Required personal info is complete
- Camera is selected
- Dates are valid
- Terms are accepted
- Agreement is accepted
- Printed name is provided
- Signature is provided
- Required documents are uploaded
- Payment screenshot is uploaded for GCash/Maya payments

## 8. Admin Requirements

Admin must be able to:

- View all booking info
- View uploaded files through secure signed URLs
- Update booking status
- Update payment status
- Add admin notes
- Filter/search bookings

## 9. UX Requirements

- Mobile-first layout
- Friendly upload buttons
- Clear booking progress stepper
- Clear error messages
- Loading states
- Success screen with reference number
- Admin panel usable on desktop and mobile
