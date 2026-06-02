# FotoShot API and Edge Functions

## 1. API Strategy

The MVP can use Next.js Server Actions or API routes for most operations. Supabase Edge Functions can be added for sensitive operations such as booking creation, status tracking, and expiration jobs.

Recommended approach:

- Use server-side code for booking creation.
- Use Supabase client for public reads of camera data.
- Use admin-only server actions for admin updates.
- Use Edge Functions for scheduled/secure tasks.

## 2. Required Operations

### Public Operations

#### Get Cameras

Purpose: Display active cameras and inclusions.

Returns:

- camera id
- name
- slug
- prices
- deposit
- inclusions
- add-ons

#### Check Availability

Input:

- camera id
- date range

Returns:

- available / unavailable
- reason if blocked

Unavailable if:

- approved/reserved/released booking overlaps date range
- blocked_dates overlap date range

#### Create Booking

Input:

- customer data
- camera id
- rental dates
- emergency contact
- student information optional
- uploaded file metadata
- terms agreement
- payment method

Output:

- booking reference number
- status
- expires_at

#### Track Booking

Input:

- reference number
- phone number

Returns:

- booking status
- payment status
- camera
- rental dates
- customer-visible admin notes

## 3. Admin Operations

### List Bookings

Filters:

- status
- camera
- payment status
- date range
- search query

### Get Booking Details

Returns:

- booking
- customer
- camera
- uploaded files
- payment proof
- emergency contact
- student info
- notes

### Update Payment Status

Actions:

- mark payment submitted
- mark verified
- mark rejected
- mark cash pending

### Update Booking Status

Actions:

- approve
- reject
- mark reserved
- mark released
- mark returned
- mark completed
- cancel

### Add Admin Note

Inputs:

- booking id
- note
- visible to customer yes/no

## 4. Suggested Edge Functions

### create-booking

Purpose:

- Validate booking data
- Validate required files
- Calculate total
- Generate reference number
- Create booking securely

### track-booking

Purpose:

- Accept reference number and phone number
- Return safe customer-facing booking details
- Prevent public access to other bookings

### expire-pending-bookings

Purpose:

- Scheduled function
- Finds pending bookings older than 24 hours
- Marks them as expired

### approve-booking

Purpose:

- Validate admin user
- Check payment verified
- Check required documents
- Check availability
- Approve booking

### log-analytics-event

Purpose:

- Insert simple analytics events
- Avoid exposing direct write logic in frontend

## 5. Booking Reference Format

Recommended format:

```text
FS-YYYY-0001
```

Example:

```text
FS-2026-0001
```

## 6. File Upload Rules

Allowed file types:

- JPG
- JPEG
- PNG
- PDF

Maximum file size:

- 10MB per file

Required file categories:

- valid_id_1
- valid_id_2
- selfie_holding_id
- specimen_signature_1
- specimen_signature_2
- specimen_signature_3
- billing_statement_1
- billing_statement_2
- billing_statement_3
- payment_screenshot for GCash/Maya payments

## 7. API Security Requirements

- Never expose service role key in frontend.
- All admin actions must require authenticated admin account.
- Customer tracking must verify both reference number and phone number.
- Private files must not be publicly accessible.
- Signed URLs should be short-lived.
- Validate file size and file type before accepting upload.
