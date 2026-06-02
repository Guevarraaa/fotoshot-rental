# Sprint 1 Build Prompt for Codex

Use this prompt to start implementation.

---

You are building the MVP of FotoShot Camera Rental.

Build a Next.js + TypeScript + Tailwind CSS + shadcn/ui project connected to Supabase.

## Project Requirements

Business name: FotoShot
Contact: +639128494056
Instagram: @thefoto.shot
Facebook: @Foto.Shot
Admin email: admin@fotoshot.com
Payment: GCash/Maya 09670141817, Shayra Mae Aquino

## Cameras

1. Canon EOS M100
   - ₱549/day for 1–3 days
   - ₱499/day for 4+ days
   - Deposit: ₱1,000
   - Inclusions: Micro SD Card, Charger, Battery, OTG Card Reader for iPhone/Type-C, Camera Bag, Cleaning Kit, Camera Lens Cap

2. Instax Mini 11
   - ₱249/day for 1–3 days
   - ₱199/day for 4+ days
   - Deposit: ₱1,000
   - Inclusions: Battery, Camera Bag, Cleaning Kit
   - Add-on: Instax Film ₱550 / box, 10 pcs

3. KODAK PIXPRO WPZ2
   - ₱399/day for 1–3 days
   - ₱349/day for 4+ days
   - Deposit: ₱1,000
   - Inclusions: Micro SD Card, Charger, Battery, OTG Card Reader for iPhone/Type-C, Camera Bag

## Sprint 1 Scope

Build the foundation and core booking UI.

### Pages

- `/` homepage
- `/cameras` camera catalog
- `/cameras/[slug]` camera detail page
- `/book` booking form
- `/track` booking status lookup UI
- `/admin/login` admin login UI
- `/admin` admin dashboard placeholder

### Components

- Header
- Footer
- CameraCard
- CameraPricing
- HowItWorks
- BookingStepper
- FileUploadField
- SignaturePad
- PaymentInstructions
- BookingSummary

### Booking Form Steps

1. Select camera and dates
2. Renter information
3. Emergency contact
4. Student info optional
5. Required uploads
6. Terms and signature
7. Payment method and screenshot
8. Review and submit

### Required Upload Fields

- valid_id_1
- valid_id_2
- selfie_holding_id
- specimen_signature_1
- specimen_signature_2
- specimen_signature_3
- billing_statement_1
- billing_statement_2
- billing_statement_3
- payment_screenshot for GCash/Maya

### Business Rules

- Standard rental period is 23 hours.
- Pickup time is 11:00 AM.
- Return time is next day by 10:00 AM.
- Late fee is ₱70/hour after 10:00 AM.
- Full payment is required to reserve the booking.
- Pending bookings do not block availability.
- Only paid + approved bookings block availability.
- Pending bookings expire after 24 hours.
- Cancellation refund is 30% only.
- No meetups.

### Pickup/Return Locations

Weekdays:
BIR RDO-19, Subic Bay Freeport Zone, 8AM–5PM only.
Map: https://maps.app.goo.gl/m4PMTt463XE8TyaW7

Weekends:
4 Sampaguita Street, Purok 5, New Cabalan, Olongapo City, sa may maliit na tindahan.
Map: https://maps.app.goo.gl/gFaeWfxtgFWGASsR9

## Technical Requirements

- Use TypeScript.
- Use Tailwind CSS.
- Use responsive mobile-first UI.
- Do not hardcode admin password.
- Prepare Supabase client setup.
- Use placeholder image paths for logo, camera photos, QR code, and sample outputs.
- Store constants in a single constants file.
- Use clean folder structure.
- Add form validation.
- Add loading and success states.

## Deliverables

- Working frontend structure
- Seeded camera data constants
- Booking form UI
- Payment instructions section
- Admin dashboard placeholder
- Track booking placeholder
- Clear TODO comments for Supabase integration
