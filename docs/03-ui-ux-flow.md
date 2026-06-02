# FotoShot UI/UX Flow

## 1. Design Principles

- Mobile-first
- Simple and clean
- Minimal distractions
- Clear call-to-action buttons
- Easy document upload from phone
- Friendly but professional rental experience
- Brand colors based on the FotoShot logo: neutral gray, black, white, and soft beige tones

## 2. Public Navigation

Recommended navigation:

- Home
- Cameras
- How It Works
- Terms
- Track Booking
- Contact

## 3. Home Page Flow

### Sections

1. Hero section
   - Logo
   - Business name
   - Short tagline
   - Button: `Book a Camera`

2. Featured cameras
   - Canon EOS M100
   - Instax Mini 11
   - KODAK PIXPRO WPZ2

3. How it works
   - Choose camera
   - Pick date
   - Submit requirements
   - Pay using GCash/Maya/Cash
   - Wait for approval
   - Pick up and return

4. Sample outputs
   - Gallery placeholder until images are added

5. Terms preview
   - Rental period
   - Late fees
   - Required documents
   - Refund policy

6. Contact
   - Phone
   - Facebook
   - Instagram

## 4. Camera Catalog Flow

Each camera card should show:

- Camera image
- Camera name
- Price for 1–3 days
- Price for 4+ days
- Deposit
- Button: `View Details`
- Button: `Book Now`

## 5. Camera Details Flow

Page content:

- Hero camera photo
- Camera name
- Price tiers
- Deposit
- Inclusions
- Add-ons if any
- Sample output gallery
- Availability calendar
- Book button

## 6. Booking Flow

Use a stepper UI.

### Step 1: Select Camera

Fields:

- Camera
- Rental start date
- Rental end date
- Calculated rental days
- Calculated rental fee
- Security deposit
- Total amount

### Step 2: Renter Information

Fields:

- Full name
- Complete address
- Contact number
- Facebook name
- Instagram username

### Step 3: Pickup / Return Information

Display pickup rules:

- Weekdays: BIR RDO-19, Subic Bay Freeport Zone, 8AM–5PM only
- Weekends: 4 Sampaguita Street, Purok 5, New Cabalan, Olongapo City
- No meetups

Fields:

- Preferred pickup location based on weekday/weekend
- Notes, optional

### Step 4: Emergency Contact

Fields:

- Full name
- Phone number
- Relationship

### Step 5: Student Information

Optional fields:

- School name
- Year level/course

### Step 6: Required Uploads

Upload fields:

- Valid ID 1
- Valid ID 2
- Selfie holding ID
- Specimen signature 1
- Specimen signature 2
- Specimen signature 3
- Billing statement 1
- Billing statement 2
- Billing statement 3

Rules:

- Max 10MB per file
- Accepted types: JPG, JPEG, PNG, PDF
- Show preview or filename after upload

### Step 7: Terms, Agreement, and Signature

Fields:

- Terms checkbox
- Agreement checkbox
- Printed name
- Digital signature pad
- Date

### Step 8: Payment

Display:

- GCash/Maya number
- Account name
- QR code image
- Total amount

Fields:

- Payment method: GCash, Maya, Cash
- Payment screenshot upload if GCash/Maya

### Step 9: Review and Submit

Show summary:

- Camera
- Rental period
- Renter info
- Required files status
- Payment status
- Total amount

Submit button:

- `Submit Booking for Review`

## 7. Booking Confirmation Screen

Display:

- Booking reference number
- Status: Pending Review
- Message: Admin will verify documents and payment.
- Track booking link

## 8. Track Booking Page

Fields:

- Booking reference number
- Phone number

Result:

- Booking status
- Payment status
- Camera
- Rental dates
- Admin message, if any

## 9. Admin Login

Fields:

- Email
- Password

Important:

- Do not hardcode passwords.
- Use Supabase Auth.

## 10. Admin Dashboard

Cards:

- Pending bookings
- Payment submitted
- Approved bookings
- Released rentals
- Returned today
- Most booked camera

## 11. Admin Bookings Table

Columns:

- Reference number
- Customer
- Camera
- Rental dates
- Payment status
- Booking status
- Created date
- Actions

Filters:

- Status
- Camera
- Date range
- Search by name/reference/phone

## 12. Admin Booking Details

Sections:

- Booking summary
- Customer information
- Emergency contact
- Student information
- Uploaded files
- Payment proof
- Terms/signature
- Admin notes
- Status action buttons

Action buttons:

- Mark payment verified
- Approve
- Reject
- Mark released
- Mark returned
- Mark completed
- Cancel booking

## 13. Responsive Design Requirements

Mobile:

- Single-column layout
- Sticky bottom `Continue` button during booking
- Large upload buttons
- Signature pad works with touch

Desktop:

- Two-column layouts where helpful
- Admin tables with filters
- File previews in side panels

Tablet:

- Similar to desktop but with stacked sections when needed
