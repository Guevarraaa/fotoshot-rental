# FotoShot Implementation Starter

## 1. Repository Setup

Create project root:

```bash
mkdir fotoshot-rental
cd fotoshot-rental
```

Suggested root structure:

```text
frontend/
backend/
docs/
assets/
.gitignore
README.md
```

## 2. Frontend Setup

```bash
npx create-next-app@latest frontend
cd frontend
```

Recommended options:

- TypeScript: yes
- Tailwind: yes
- App Router: yes
- ESLint: yes
- src directory: optional, but recommended

## 3. Install UI Dependencies

```bash
npx shadcn@latest init
```

Add useful components:

```bash
npx shadcn@latest add button card input label textarea select checkbox dialog table badge tabs alert calendar
```

## 4. Supabase Setup

Install Supabase client:

```bash
npm install @supabase/supabase-js
```

Create `.env.local`:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## 5. Backend Setup

Create folders:

```bash
mkdir -p ../backend/sql ../backend/rls ../backend/edge-functions ../backend/migrations ../backend/seed
```

Place:

- `06-supabase-schema.sql` into `backend/sql/`
- `07-rls-policies.sql` into `backend/rls/`

## 6. Assets Setup

Create:

```bash
mkdir -p ../assets/logo
mkdir -p ../assets/payment/qr-codes
mkdir -p ../assets/cameras/canon-eos-m100
mkdir -p ../assets/cameras/instax-mini-11
mkdir -p ../assets/cameras/kodak-pixpro-wpz2
mkdir -p ../assets/sample-outputs/canon-eos-m100
mkdir -p ../assets/sample-outputs/instax-mini-11
mkdir -p ../assets/sample-outputs/kodak-pixpro-wpz2
mkdir -p ../assets/documents/terms-and-conditions
```

## 7. Gitignore

Recommended `.gitignore`:

```text
node_modules
.next
.env
.env.local
.env.*.local
.DS_Store
dist
build
.vercel
.supabase
```

## 8. First Implementation Milestone

Build these first:

- Homepage
- Camera cards
- Booking form UI
- Payment instructions with placeholder QR
- Admin login page placeholder

## 9. Second Implementation Milestone

Connect Supabase:

- Camera data from database
- Booking insert
- Upload files
- Admin auth
- Admin dashboard

## 10. Third Implementation Milestone

Add:

- Booking status tracking
- Admin approval flow
- Availability calendar logic
- Testing and polish
