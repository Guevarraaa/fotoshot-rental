# FotoShot Admin Operations Manual

## 1. Admin Login

Admin email:

```text
admin@fotoshot.com
```

Use Supabase Auth. Do not hardcode the password in the codebase.

## 2. Daily Admin Workflow

1. Log in to admin panel.
2. Check pending bookings.
3. Open each booking.
4. Review renter information.
5. Review uploaded documents.
6. Review payment screenshot or cash payment request.
7. Verify payment.
8. Approve or reject booking.
9. Add admin notes when needed.
10. Update status when camera is released.
11. Update status when camera is returned.
12. Mark booking completed after inspection.

## 3. Booking Status Meaning

### pending_review

Booking was submitted and needs admin review.

### payment_submitted

Customer uploaded payment proof.

### paid_verified

Admin verified payment.

### approved

Admin approved the booking.

### reserved

Booking is confirmed and the camera/date is reserved.

### released

Camera has been picked up/released to renter.

### returned

Camera has been returned but may still need inspection.

### completed

Rental is complete and closed.

### rejected

Booking was rejected.

### expired

Booking expired because payment/documents were not completed within 24 hours.

### cancelled

Booking was cancelled.

## 4. Approval Checklist

Approve only when all are complete:

- [ ] Full name
- [ ] Complete address
- [ ] Contact number
- [ ] Emergency contact
- [ ] Camera selected
- [ ] Rental dates valid
- [ ] Valid ID 1 uploaded
- [ ] Valid ID 2 uploaded
- [ ] Selfie holding ID uploaded
- [ ] Three specimen signatures uploaded
- [ ] Three billing statements uploaded
- [ ] Payment screenshot uploaded, if GCash/Maya
- [ ] Payment verified or cash payment confirmed
- [ ] Printed name completed
- [ ] Digital signature completed
- [ ] Terms accepted
- [ ] Agreement accepted

## 5. Payment Verification

For GCash/Maya:

1. Open payment screenshot.
2. Check amount.
3. Check recipient name: Shayra Mae Aquino.
4. Check number: 09670141817.
5. Check date/time.
6. Mark payment as verified if correct.

For cash:

1. Mark as cash_pending until cash is received.
2. Mark as verified after receiving cash.

## 6. Release Checklist

Before releasing camera:

- [ ] Confirm renter identity
- [ ] Confirm booking is approved/reserved
- [ ] Confirm payment is verified
- [ ] Confirm accessories are complete
- [ ] Take/record release condition if needed
- [ ] Mark booking as released

## 7. Return Checklist

When camera is returned:

- [ ] Returned by 10:00 AM
- [ ] Camera is fully charged
- [ ] Camera powers on
- [ ] Accessories complete
- [ ] No visible damage
- [ ] Memory card returned
- [ ] Charger returned
- [ ] Bag returned
- [ ] Late fee calculated if late
- [ ] Deposit returned or adjusted
- [ ] Mark booking as returned/completed

## 8. Late Fee Calculation

Late fee: **₱70/hour** after 10:00 AM.

Examples:

- Returned 10:30 AM: ₱70
- Returned 11:15 AM: ₱140
- Returned 12:05 PM: ₱210

Use rounded-up hours for simplicity.

## 9. Admin Notes

Use admin notes for:

- Payment verification details
- Customer requests
- Missing document reminders
- Damage notes
- Return inspection notes

Customer-visible notes should only contain safe, simple updates.

## 10. When to Reject Booking

Reject if:

- Documents are incomplete
- IDs appear invalid
- Payment proof is missing or invalid
- Customer gives false information
- Camera/date is unavailable
- Owner decides to refuse service
