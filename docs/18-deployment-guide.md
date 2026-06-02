# FotoShot Deployment Guide

## 1. Deployment Overview

Use:

- Vercel for Next.js frontend
- Supabase for backend, database, auth, and storage

## 2. Supabase Setup

1. Create Supabase project.
2. Open SQL editor.
3. Run `06-supabase-schema.sql`.
4. Run `07-rls-policies.sql`.
5. Create storage buckets:
   - `camera-assets` public
   - `site-assets` public
   - `booking-documents` private
   - `payment-proofs` private
6. Create admin user through Supabase Auth.
7. Insert admin profile into `admin_profiles`.

Example admin profile insert after creating user:

```sql
insert into public.admin_profiles (id, email, full_name, role)
values ('AUTH_USER_ID_HERE', 'admin@fotoshot.com', 'FotoShot Admin', 'admin');
```

## 3. Environment Variables

In Vercel:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Only use `SUPABASE_SERVICE_ROLE_KEY` in server-only code.

## 4. Vercel Deployment

1. Push repository to GitHub.
2. Import project in Vercel.
3. Select `frontend/` as project root.
4. Add environment variables.
5. Deploy.

## 5. Domain Setup

Add domain later if available.

Possible domains:

- fotoshot.ph
- fotoshotrental.com
- fotoshotcamera.com

## 6. Production Checklist

Before going live:

- [ ] Admin can log in
- [ ] Camera pages load
- [ ] Booking form works
- [ ] Uploads work
- [ ] Payment QR displays
- [ ] Admin can view payment proof
- [ ] Admin can approve booking
- [ ] Approved booking blocks availability
- [ ] Customer can track booking
- [ ] Mobile layout tested
- [ ] Private files are not publicly accessible

## 7. Rollback Plan

If production has issues:

1. Disable booking form temporarily.
2. Show contact message directing customers to Facebook/Instagram.
3. Revert to previous Vercel deployment.
4. Check Supabase logs.
5. Restore database backup if needed.
