# FotoShot Testing Plan

## 1. Testing Goals

Verify that the MVP works correctly, protects sensitive files, and allows customers and admin to complete the full rental workflow.

## 2. Functional Testing

### Public Website

Test:

- Home page loads
- Camera catalog loads
- Camera details load
- Pricing is correct
- Inclusions are correct
- Contact details are correct
- Terms page loads
- Mobile layout works
- Desktop layout works

### Booking Form

Test:

- Customer can select each camera
- Customer can select rental dates
- Pricing changes based on number of days
- 1–3 day price is correct
- 4+ day price is correct
- Deposit is added
- Instax film add-on works
- Required fields show validation errors
- Terms must be accepted
- Agreement must be accepted
- Signature must be provided
- Printed name must be provided
- Date must be provided

### Uploads

Test:

- Valid ID 1 uploads
- Valid ID 2 uploads
- Selfie holding ID uploads
- Three specimen signatures upload
- Three billing statements upload
- Payment screenshot uploads
- Files over 10MB are rejected
- Invalid file types are rejected

### Payment Flow

Test:

- GCash details display correctly
- Maya details display correctly
- Payment screenshot is required for GCash/Maya
- Cash payment can be selected
- Cash payment status becomes cash_pending

### Booking Submission

Test:

- Booking saves to database
- Customer saves to database
- Files save to storage
- Reference number is generated
- Confirmation screen displays
- Status starts as pending_review

## 3. Admin Testing

Test:

- Admin can log in
- Non-admin cannot access admin pages
- Admin can view bookings
- Admin can search bookings
- Admin can filter bookings
- Admin can open booking details
- Admin can view uploaded files
- Admin can mark payment verified
- Admin can approve booking
- Admin can reject booking
- Admin can mark released
- Admin can mark returned
- Admin can mark completed
- Admin can add notes

## 4. Availability Testing

Test:

- Pending booking does not block availability
- Payment submitted booking does not block availability
- Approved booking blocks availability
- Reserved booking blocks availability
- Released booking blocks availability
- Completed booking does not block future availability
- Rejected booking does not block availability
- Expired booking does not block availability
- Manual blocked date blocks availability

## 5. Customer Tracking Testing

Test:

- Correct reference + phone shows booking
- Wrong phone does not show booking
- Wrong reference does not show booking
- Customer cannot see uploaded file URLs
- Customer sees only safe status information

## 6. Security Testing

Test:

- Public user cannot access admin pages
- Public user cannot list all bookings
- Public user cannot view private files
- Admin can view private files
- Service role key is not exposed in browser
- RLS is enabled on sensitive tables
- Storage buckets for documents are private

## 7. Responsive Testing

Test on:

- iPhone-sized screen
- Android-sized screen
- Tablet width
- Laptop width
- Desktop width

Important mobile checks:

- File upload works
- Signature pad works
- Buttons are easy to tap
- Forms are not too cramped

## 8. User Acceptance Testing

Have a test user complete:

1. Choose Canon EOS M100
2. Select 2 rental days
3. Fill renter details
4. Upload sample files
5. Sign agreement
6. Upload fake payment screenshot
7. Submit booking
8. Admin approves booking
9. Customer tracks booking status

## 9. Production Smoke Test

After deployment:

- Open website on mobile
- Open website on desktop
- Submit one test booking
- Verify admin can see it
- Delete or mark test booking as cancelled
