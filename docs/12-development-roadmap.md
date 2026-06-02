# FotoShot Development Roadmap

## Sprint 0: Planning and Assets

Status: Planning complete.

Tasks:

- Finalize business rules
- Prepare logo
- Prepare camera photos
- Prepare sample output galleries
- Prepare GCash/Maya QR code
- Add replacement values later

## Sprint 1: Foundation and Public UI

Duration: 1–2 days

Tasks:

- Create Next.js project
- Set up Tailwind and shadcn/ui
- Build homepage
- Build camera catalog
- Build camera details pages
- Add static camera data
- Add responsive layout

Deliverable:

- Public site can be viewed on mobile and desktop.

## Sprint 2: Booking Form MVP

Duration: 1–2 days

Tasks:

- Build booking stepper
- Add renter information form
- Add emergency contact form
- Add student info optional section
- Add required upload UI
- Add digital signature pad
- Add terms checkboxes
- Add payment instructions and proof upload
- Add review and submit screen

Deliverable:

- Customer can complete full booking form in UI.

## Sprint 3: Supabase Integration

Duration: 1–2 days

Tasks:

- Create Supabase project
- Run schema SQL
- Run RLS SQL
- Create storage buckets
- Connect frontend to Supabase
- Save customer and booking records
- Upload files to storage
- Generate booking reference number

Deliverable:

- Real booking data is saved.

## Sprint 4: Admin Panel

Duration: 1–2 days

Tasks:

- Set up Supabase Auth
- Create admin login
- Create admin dashboard
- Create bookings table
- Create booking details page
- Add payment verification action
- Add approve/reject actions
- Add released/returned/completed actions
- Add admin notes

Deliverable:

- Admin can manage bookings.

## Sprint 5: Availability and Tracking

Duration: 1 day

Tasks:

- Implement availability logic
- Approved bookings block dates
- Add blocked dates support
- Add customer track booking page
- Add booking expiration logic

Deliverable:

- Customers can track status; availability respects approved bookings.

## Sprint 6: Testing and Deployment

Duration: 1–2 days

Tasks:

- Test mobile booking
- Test desktop admin
- Test file uploads
- Test RLS/security
- Test status changes
- Deploy to Vercel
- Configure environment variables
- Review production behavior

Deliverable:

- MVP is live.

## Estimated MVP Duration

- Fast build: **4–5 days**
- Safer build with testing: **7–10 days**

## Future Roadmap

### Version 2

- Auto-generated PDF rental agreement
- Email notifications
- Better analytics dashboard
- Customer status notifications

### Version 3

- PayMongo integration
- Multi-admin permissions
- Automatic booking reminders
- Advanced calendar management
