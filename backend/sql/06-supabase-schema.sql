-- FotoShot Supabase Schema
-- Run in Supabase SQL editor after reviewing for your environment.

create extension if not exists pgcrypto;

create type public.booking_status as enum (
  'pending_review',
  'payment_submitted',
  'paid_verified',
  'approved',
  'reserved',
  'released',
  'returned',
  'completed',
  'rejected',
  'expired',
  'cancelled'
);

create type public.payment_status as enum (
  'unpaid',
  'payment_submitted',
  'verified',
  'rejected',
  'cash_pending'
);

create type public.file_type as enum (
  'valid_id_1',
  'valid_id_2',
  'selfie_holding_id',
  'specimen_signature_1',
  'specimen_signature_2',
  'specimen_signature_3',
  'billing_statement_1',
  'billing_statement_2',
  'billing_statement_3',
  'payment_screenshot',
  'digital_signature'
);

create table public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

create table public.cameras (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  price_1_to_3_days numeric(10,2) not null,
  price_4_plus_days numeric(10,2) not null,
  security_deposit numeric(10,2) not null default 1000.00,
  replacement_value numeric(10,2),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.camera_inclusions (
  id uuid primary key default gen_random_uuid(),
  camera_id uuid not null references public.cameras(id) on delete cascade,
  name text not null,
  sort_order int not null default 0
);

create table public.camera_addons (
  id uuid primary key default gen_random_uuid(),
  camera_id uuid not null references public.cameras(id) on delete cascade,
  name text not null,
  description text,
  price numeric(10,2) not null,
  is_active boolean not null default true
);

create table public.customers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  complete_address text not null,
  contact_number text not null,
  facebook_name text,
  instagram_username text,
  created_at timestamptz not null default now()
);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  reference_number text not null unique,
  customer_id uuid not null references public.customers(id) on delete restrict,
  camera_id uuid not null references public.cameras(id) on delete restrict,
  rental_start_date date not null,
  rental_end_date date not null,
  pickup_time time not null default '11:00',
  return_time time not null default '10:00',
  rental_days int not null check (rental_days >= 1),
  rental_fee numeric(10,2) not null,
  security_deposit numeric(10,2) not null default 1000.00,
  addon_total numeric(10,2) not null default 0,
  total_amount numeric(10,2) not null,
  payment_method text not null check (payment_method in ('gcash','maya','cash')),
  payment_status public.payment_status not null default 'unpaid',
  booking_status public.booking_status not null default 'pending_review',
  pickup_location_type text not null check (pickup_location_type in ('weekday_bir','weekend_new_cabalan')),
  pickup_location_text text not null,
  terms_accepted boolean not null default false,
  agreement_accepted boolean not null default false,
  printed_name text not null,
  signed_date date not null,
  signature_file_path text,
  expires_at timestamptz not null default (now() + interval '24 hours'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint valid_rental_dates check (rental_end_date >= rental_start_date)
);

create table public.booking_files (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  file_type public.file_type not null,
  file_path text not null,
  original_file_name text not null,
  mime_type text not null,
  file_size bigint not null check (file_size <= 10485760),
  uploaded_at timestamptz not null default now(),
  unique (booking_id, file_type)
);

create table public.emergency_contacts (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null unique references public.bookings(id) on delete cascade,
  full_name text not null,
  phone_number text not null,
  relationship text not null
);

create table public.student_information (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null unique references public.bookings(id) on delete cascade,
  school_name text,
  year_level_course text
);

create table public.admin_notes (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  admin_user_id uuid references auth.users(id) on delete set null,
  note text not null,
  is_visible_to_customer boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.blocked_dates (
  id uuid primary key default gen_random_uuid(),
  camera_id uuid not null references public.cameras(id) on delete cascade,
  start_date date not null,
  end_date date not null,
  reason text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  constraint valid_blocked_dates check (end_date >= start_date)
);

create table public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  camera_id uuid references public.cameras(id) on delete set null,
  booking_id uuid references public.bookings(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index idx_bookings_reference_number on public.bookings(reference_number);
create index idx_bookings_camera_id on public.bookings(camera_id);
create index idx_bookings_status on public.bookings(booking_status);
create index idx_bookings_payment_status on public.bookings(payment_status);
create index idx_bookings_dates on public.bookings(rental_start_date, rental_end_date);
create index idx_customers_contact_number on public.customers(contact_number);
create index idx_booking_files_booking_id on public.booking_files(booking_id);
create index idx_blocked_dates_camera_id on public.blocked_dates(camera_id);
create index idx_analytics_events_name on public.analytics_events(event_name);

insert into public.cameras (slug, name, price_1_to_3_days, price_4_plus_days, security_deposit) values
('canon-eos-m100', 'Canon EOS M100', 549.00, 499.00, 1000.00),
('instax-mini-11', 'Instax Mini 11', 249.00, 199.00, 1000.00),
('kodak-pixpro-wpz2', 'KODAK PIXPRO WPZ2', 399.00, 349.00, 1000.00);

insert into public.camera_inclusions (camera_id, name, sort_order)
select id, 'Micro SD Card', 1 from public.cameras where slug='canon-eos-m100'
union all select id, 'Charger', 2 from public.cameras where slug='canon-eos-m100'
union all select id, 'Battery', 3 from public.cameras where slug='canon-eos-m100'
union all select id, 'OTG Card Reader for iPhone / Type-C', 4 from public.cameras where slug='canon-eos-m100'
union all select id, 'Camera Bag', 5 from public.cameras where slug='canon-eos-m100'
union all select id, 'Cleaning Kit', 6 from public.cameras where slug='canon-eos-m100'
union all select id, 'Camera Lens Cap', 7 from public.cameras where slug='canon-eos-m100'
union all select id, 'Battery', 1 from public.cameras where slug='instax-mini-11'
union all select id, 'Camera Bag', 2 from public.cameras where slug='instax-mini-11'
union all select id, 'Cleaning Kit', 3 from public.cameras where slug='instax-mini-11'
union all select id, 'Micro SD Card', 1 from public.cameras where slug='kodak-pixpro-wpz2'
union all select id, 'Charger', 2 from public.cameras where slug='kodak-pixpro-wpz2'
union all select id, 'Battery', 3 from public.cameras where slug='kodak-pixpro-wpz2'
union all select id, 'OTG Card Reader for iPhone / Type-C', 4 from public.cameras where slug='kodak-pixpro-wpz2'
union all select id, 'Camera Bag', 5 from public.cameras where slug='kodak-pixpro-wpz2';

insert into public.camera_addons (camera_id, name, description, price)
select id, 'Instax Film', '1 box, 10 pcs', 550.00 from public.cameras where slug='instax-mini-11';
