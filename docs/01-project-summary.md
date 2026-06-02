# FotoShot Project Summary

## Project Name

**FotoShot Camera Rental Website**

## Purpose

FotoShot needs a simple, secure, and mobile-friendly camera rental website where customers can browse available cameras, check availability, submit rental information, upload requirements, view GCash/Maya payment details, upload payment proof, and wait for admin approval.

The admin panel should be simple but should capture all important booking, renter, payment, and document information.

## Main Business Goal

Allow customers to book cameras online while reducing manual work through Facebook/Instagram messages.

## MVP Goal

Build a working rental booking system with:

- Public website
- Camera catalog
- Camera details
- Availability calendar
- Booking form
- Required document uploads
- Digital signature
- GCash/Maya QR/payment screenshot flow
- Simple admin dashboard
- Booking status tracking

## Target Users

### Customers / Renters

People who want to rent one of FotoShot's cameras for personal, school, event, travel, or content creation use.

### Admin / Owner

FotoShot owner/admin who reviews bookings, verifies requirements, confirms payment, approves bookings, and manages return/completion status.

## MVP Cameras

1. Canon EOS M100
2. Instax Mini 11
3. KODAK PIXPRO WPZ2

## MVP Payment Method

Manual payment verification:

1. Customer views GCash/Maya number or QR code.
2. Customer sends payment.
3. Customer uploads payment screenshot.
4. Admin verifies payment.
5. Admin marks booking as paid/approved.

No automatic PayMongo or payment gateway integration in MVP.

## MVP Technical Stack

- Frontend: **Next.js**
- Styling: **Tailwind CSS**
- UI components: **shadcn/ui**
- Backend/database/auth/storage: **Supabase**
- Deployment: **Vercel**
- File storage: **Supabase Storage**
- Backend logic: **Supabase Edge Functions where needed**

## Out of Scope for MVP

- PayMongo integration
- Automatic GCash verification
- SMS notifications
- Advanced SEO
- Loyalty/rewards system
- Multi-branch management
- Mobile app

## MVP Success Criteria

The MVP is successful when:

- A customer can submit a complete booking request.
- A customer can upload all required documents.
- A customer can upload payment proof.
- Admin can view booking details and documents.
- Admin can approve/reject bookings.
- Approved bookings block camera availability.
- Customer can check booking status using reference number and phone number.
- Data and uploaded documents are protected by authentication and RLS.
