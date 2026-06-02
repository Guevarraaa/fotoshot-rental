-- FotoShot RLS Policies
-- Review before applying in production.

alter table public.admin_profiles enable row level security;
alter table public.cameras enable row level security;
alter table public.camera_inclusions enable row level security;
alter table public.camera_addons enable row level security;
alter table public.customers enable row level security;
alter table public.bookings enable row level security;
alter table public.booking_files enable row level security;
alter table public.emergency_contacts enable row level security;
alter table public.student_information enable row level security;
alter table public.admin_notes enable row level security;
alter table public.blocked_dates enable row level security;
alter table public.analytics_events enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_profiles ap
    where ap.id = auth.uid()
  );
$$;

-- Public readable camera data
create policy "Public can read active cameras"
on public.cameras for select
using (is_active = true);

create policy "Public can read camera inclusions"
on public.camera_inclusions for select
using (true);

create policy "Public can read active camera addons"
on public.camera_addons for select
using (is_active = true);

-- Admin full access
create policy "Admin full access cameras"
on public.cameras for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Admin full access camera inclusions"
on public.camera_inclusions for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Admin full access camera addons"
on public.camera_addons for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Admin full access customers"
on public.customers for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Admin full access bookings"
on public.bookings for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Admin full access booking files"
on public.booking_files for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Admin full access emergency contacts"
on public.emergency_contacts for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Admin full access student information"
on public.student_information for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Admin full access admin notes"
on public.admin_notes for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Admin full access blocked dates"
on public.blocked_dates for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Admin can view analytics"
on public.analytics_events for select
to authenticated
using (public.is_admin());

-- Public insert policies for customer booking creation.
-- In production, prefer using a server action or edge function with validation.
create policy "Public can insert customers"
on public.customers for insert
to anon, authenticated
with check (true);

create policy "Public can insert bookings"
on public.bookings for insert
to anon, authenticated
with check (
  terms_accepted = true
  and agreement_accepted = true
  and booking_status = 'pending_review'
);

create policy "Public can insert emergency contacts"
on public.emergency_contacts for insert
to anon, authenticated
with check (true);

create policy "Public can insert student information"
on public.student_information for insert
to anon, authenticated
with check (true);

create policy "Public can insert booking files"
on public.booking_files for insert
to anon, authenticated
with check (true);

create policy "Public can insert analytics events"
on public.analytics_events for insert
to anon, authenticated
with check (true);

-- Customer tracking should be implemented through an edge function or server route
-- that validates reference_number + contact_number. Avoid direct broad SELECT policies.

-- Storage bucket recommendations:
-- 1. camera-assets: public
-- 2. site-assets: public
-- 3. booking-documents: private
-- 4. payment-proofs: private

-- Supabase Storage policies depend on bucket creation.
-- Recommended:
-- - public read for camera-assets and site-assets
-- - admin read for booking-documents and payment-proofs
-- - controlled upload paths for public booking submission
