# FotoShot Master Product Plan

## 1. Product Vision

FotoShot will provide a simple and reliable online rental experience for camera renters while giving the owner a lightweight admin system for verification, approval, and booking management.

## 2. User Roles

### Public Visitor

Can view:

- Home page
- Camera catalog
- Camera details
- Sample output galleries
- Terms and conditions
- Contact information

### Customer / Renter

Can:

- Select a camera
- Choose rental dates
- Fill out renter information
- Upload required files
- Sign digitally
- View GCash/Maya payment details
- Upload payment screenshot
- Submit booking
- Check booking status

### Admin

Can:

- Log in
- View dashboard
- View bookings
- Search and filter bookings
- View renter details
- View uploaded files
- Verify payment
- Approve/reject bookings
- Mark bookings as released, returned, or completed
- Add admin notes
- Manage camera availability and blocked dates

## 3. Main Features

### Public Website

- Landing page
- Camera catalog
- Camera details
- Sample output gallery
- How it works section
- Terms and conditions section/page
- Contact section

### Booking System

- Camera selection
- Rental date selection
- Auto-calculated rental duration and total amount
- Document uploads
- Signature capture
- Payment instructions
- Payment screenshot upload
- Booking reference number generation

### Admin System

- Admin authentication
- Dashboard metrics
- Bookings table
- Booking details page
- File/document viewer links
- Payment verification control
- Booking status control
- Admin notes
- Camera availability management

### Customer Status Page

Customers enter:

- Booking reference number
- Phone number

Then the system displays:

- Booking status
- Camera name
- Rental date
- Payment status
- Admin notes visible to customer, if any

## 4. Booking Status Lifecycle

```text
Pending Review
↓
Payment Submitted
↓
Paid / Verified
↓
Approved
↓
Reserved
↓
Released
↓
Returned
↓
Completed
```

Alternative paths:

```text
Pending Review → Rejected
Pending Review → Expired / Cancelled
Approved → Cancelled
```

## 5. Calendar Availability Rule

Only the following booking states block availability:

- Approved
- Reserved
- Released

The following states do not block availability:

- Pending Review
- Payment Submitted
- Rejected
- Expired / Cancelled
- Completed

## 6. Payment Rule

Items are reserved only after full payment is received and verified.

## 7. Customer Requirements

- Two valid government-issued photo IDs
- Selfie holding valid ID(s)
- Three specimen signatures
- Three recent billing statements
- Payment screenshot
- Printed name
- Digital signature
- Date

## 8. Acceptance Criteria

### Customer Booking

A booking is valid when:

- Camera is selected
- Rental date is selected
- Required customer information is provided
- Required documents are uploaded
- Payment proof is uploaded or cash payment is selected
- Terms are accepted
- Digital signature, printed name, and date are completed

### Admin Approval

Admin can approve only when:

- Customer details are complete
- Documents are complete
- Payment is verified
- Selected camera/date is still available

## 9. Future Enhancements

- PayMongo integration
- Automatic email notifications
- SMS notifications
- Auto-generated PDF agreement
- Customer account system
- Multi-admin roles
- Advanced analytics
