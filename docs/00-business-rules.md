# FotoShot Business Rules

## 1. Business Identity

- Business name: **FotoShot**
- Contact number: **+639128494056**
- Instagram: **@thefoto.shot**
- Facebook: **@Foto.Shot**
- Admin account email: **admin@fotoshot.com**
- Payment recipient name: **Shayra Mae Aquino**
- Payment number: **09670141817**
- Accepted payment methods: **GCash, Maya, Cash**

## 2. Cameras and Pricing

| Camera | 1–3 Days | 4+ Days | Security Deposit |
|---|---:|---:|---:|
| Canon EOS M100 | ₱549/day | ₱499/day | ₱1,000 refundable |
| Instax Mini 11 | ₱249/day | ₱199/day | ₱1,000 refundable |
| KODAK PIXPRO WPZ2 | ₱399/day | ₱349/day | ₱1,000 refundable |

### Instax Add-on

- Instax film: **₱550 / box**
- 1 box contains **10 pcs**

## 3. Camera Inclusions

### Canon EOS M100

- Micro SD Card
- Charger
- Battery
- OTG Card Reader for iPhone / Type-C
- Camera Bag
- Cleaning Kit
- Camera Lens Cap

### Instax Mini 11

- Battery
- Camera Bag
- Cleaning Kit

### KODAK PIXPRO WPZ2

- Micro SD Card
- Charger
- Battery
- OTG Card Reader for iPhone / Type-C
- Camera Bag

## 4. Rental Period

- Standard rental period: **23 hours**
- Pick-up time: **11:00 AM**
- Return time: **Next day by 10:00 AM**
- The 1-hour gap is for cleaning, checking, and preparing the camera for the next renter.

## 5. Late Return Policy

- If the camera is returned after **10:00 AM**, a late fee of **₱70.00 per hour** will be charged.
- Late fees are calculated from **10:00 AM onwards**.

## 6. Return Condition

The renter must return the camera:

- Fully charged
- Complete with all inclusions/accessories
- Clean and in the same working condition as released

Any damage, missing parts, or failure to return the camera fully charged may result in additional charges or forfeiture of the security deposit.

## 7. Reservation Logic

The system follows **Option A**:

1. Customer submits a booking request.
2. Booking status becomes **Pending Review**.
3. Admin reviews uploaded documents and payment proof.
4. Booking becomes reserved only after payment is verified and the booking is approved.

Important rule:

> Pending bookings do not block the calendar. Only **Paid + Approved** bookings block availability.

## 8. Booking Expiration

- Pending bookings expire after **24 hours** if payment/documents are incomplete or not verified.
- Expired bookings should not block calendar availability.

## 9. Payment Rules

- Full payment is required to reserve the booking.
- Customers may pay through **GCash**, **Maya**, or **Cash**.
- GCash/Maya details:
  - Number: **09670141817**
  - Name: **Shayra Mae Aquino**
- For online payment, the customer must upload a payment screenshot.
- For cash payment, the admin manually marks the booking as paid after confirmation.
- GCash/Maya QR code will be stored in the project assets folder.

## 10. Cancellation and Refunds

- In case of cancellation, only **30%** will be refunded.
- No refunds will be given for early returns.
- No refunds will be given for no-shows.

## 11. Required Customer Uploads

Before approval, the customer must submit:

- Two (2) valid government-issued photo IDs
- Selfie holding the valid ID(s)
- Three (3) specimen signatures
- Three (3) recent billing statements as proof of address
- Payment screenshot, if paid via GCash/Maya
- Digital signature on the rental form/agreement
- Printed name
- Date signed

## 12. Pickup and Return Rules

There is **no meetup service**. Pickup and return are only allowed at the listed locations.

### Weekdays

- Location: **BIR RDO-19, Subic Bay Freeport Zone**
- Time: **8:00 AM – 5:00 PM only**
- Maps link: `https://maps.app.goo.gl/m4PMTt463XE8TyaW7`

### Weekends

- Location: **4 Sampaguita Street, Purok 5, New Cabalan, Olongapo City**
- Landmark: **sa may maliit na tindahan**
- Maps link: `https://maps.app.goo.gl/gFaeWfxtgFWGASsR9`

## 13. Owner's Rights

The owner reserves the right to:

- Cancel or reschedule any booking due to unforeseen circumstances such as equipment maintenance, emergencies, or force majeure.
- Refuse rental service to anyone without providing a reason.

## 14. Renter Responsibility

- The renter is fully responsible for the camera during the rental period.
- Any loss, theft, or major damage will be charged to the renter at full replacement cost.
- Replacement values per camera will be added later.

## 15. Website Device Support

The website must work on:

- Mobile phones
- Tablets
- Laptops
- Desktop computers

The MVP must be mobile-first because most renters will likely submit bookings, upload IDs, and upload payment screenshots from a phone.

## 16. Interactive Website Requirements

The website should not be fully static. It must include:

- Clickable camera cards
- Interactive availability calendar
- Booking step progress indicator
- Upload preview
- Digital signature pad
- GCash/Maya QR display
- Payment screenshot upload
- Admin search/filter
- Booking status indicators
- Customer booking status page
