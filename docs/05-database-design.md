# FotoShot Database Design Documentation

## 1. Main Tables

### cameras

Stores the three rentable cameras.

Fields:

- id
- slug
- name
- description
- price_1_to_3_days
- price_4_plus_days
- security_deposit
- replacement_value
- is_active
- created_at
- updated_at

### camera_inclusions

Stores the included accessories for each camera.

Fields:

- id
- camera_id
- name
- sort_order

### camera_addons

Stores optional add-ons such as Instax film.

Fields:

- id
- camera_id
- name
- description
- price
- is_active

### customers

Stores renter information.

Fields:

- id
- full_name
- complete_address
- contact_number
- facebook_name
- instagram_username
- created_at

### bookings

Stores booking and rental details.

Fields:

- id
- reference_number
- customer_id
- camera_id
- rental_start_date
- rental_end_date
- pickup_time
- return_time
- rental_days
- rental_fee
- security_deposit
- addon_total
- total_amount
- payment_method
- payment_status
- booking_status
- pickup_location_type
- pickup_location_text
- terms_accepted
- agreement_accepted
- printed_name
- signed_date
- signature_file_path
- expires_at
- created_at
- updated_at

### booking_files

Stores uploaded documents.

Fields:

- id
- booking_id
- file_type
- file_path
- original_file_name
- mime_type
- file_size
- uploaded_at

File types:

- valid_id_1
- valid_id_2
- selfie_holding_id
- specimen_signature_1
- specimen_signature_2
- specimen_signature_3
- billing_statement_1
- billing_statement_2
- billing_statement_3
- payment_screenshot

### emergency_contacts

Fields:

- id
- booking_id
- full_name
- phone_number
- relationship

### student_information

Fields:

- id
- booking_id
- school_name
- year_level_course

### admin_notes

Fields:

- id
- booking_id
- admin_user_id
- note
- is_visible_to_customer
- created_at

### blocked_dates

Manual admin blocks for maintenance or unavailable dates.

Fields:

- id
- camera_id
- start_date
- end_date
- reason
- created_by
- created_at

### analytics_events

Simple internal analytics.

Fields:

- id
- event_name
- camera_id
- booking_id
- metadata
- created_at

## 2. Status Values

### booking_status

Recommended enum values:

- pending_review
- payment_submitted
- paid_verified
- approved
- reserved
- released
- returned
- completed
- rejected
- expired
- cancelled

### payment_status

Recommended enum values:

- unpaid
- payment_submitted
- verified
- rejected
- cash_pending

## 3. Relationships

```text
cameras 1 → many camera_inclusions
cameras 1 → many camera_addons
cameras 1 → many bookings
customers 1 → many bookings
bookings 1 → many booking_files
bookings 1 → 1 emergency_contacts
bookings 1 → 1 student_information
bookings 1 → many admin_notes
cameras 1 → many blocked_dates
```

## 4. Calendar Availability Logic

A date is unavailable if:

1. There is an approved/reserved/released booking for the camera in that date range.
2. There is a manual blocked date for the camera.

Pending bookings do not block availability.

## 5. Indexes

Recommended indexes:

- bookings.reference_number
- bookings.camera_id
- bookings.booking_status
- bookings.payment_status
- bookings.rental_start_date
- bookings.rental_end_date
- customers.contact_number
- booking_files.booking_id
- blocked_dates.camera_id

## 6. Data Retention Notes

Uploaded IDs and billing documents are sensitive personal information. The admin should define a retention period later. Recommended starting rule:

- Keep files while booking is active.
- Keep records for operational/legal reference.
- Allow manual deletion/export in future versions.
