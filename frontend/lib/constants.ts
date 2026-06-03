import type { Camera } from "@/types/camera";

export const businessInfo = {
  name: "FotoShot",
  tagline: "Camera rentals for trips, school, events, and everyday memories.",
  contactNumber: "+639128494056",
  instagram: "@thefoto.shot",
  facebook: "@Foto.Shot",
  adminEmail: "admin@fotoshot.com",
};

export const paymentInfo = {
  methods: ["GCash", "Maya", "Cash"],
  onlineNumber: "09670141817",
  onlineName: "Shayra Mae Aquino",
  qrPlaceholderPath: "/payment-qr-placeholder.svg",
};

export const rentalRules = {
  standardPeriod: "23 hours",
  pickupTime: "11:00 AM",
  returnTime: "Next day by 10:00 AM",
  lateFee: 70,
  cancellationRefund: "30% only",
  pendingExpiry: "24 hours",
};

export const pickupLocations = [
  {
    id: "weekday_bir",
    label: "Weekday pickup / return",
    detail: "BIR RDO-19, Subic Bay Freeport Zone, 8AM-5PM only",
    map: "https://maps.app.goo.gl/m4PMTt463XE8TyaW7",
  },
  {
    id: "weekend_new_cabalan",
    label: "Weekend pickup / return",
    detail:
      "4 Sampaguita Street, Purok 5, New Cabalan, Olongapo City, near small store",
    map: "https://maps.app.goo.gl/gFaeWfxtgFWGASsR9",
  },
];

export const uploadRequirements = [
  { id: "valid_id_1", label: "Valid government ID 1" },
  { id: "valid_id_2", label: "Valid government ID 2" },
  { id: "selfie_holding_id", label: "Selfie holding valid ID" },
  { id: "specimen_signature_1", label: "Specimen signature 1" },
  { id: "specimen_signature_2", label: "Specimen signature 2" },
  { id: "specimen_signature_3", label: "Specimen signature 3" },
  { id: "billing_statement_1", label: "Billing statement / proof of address 1" },
  { id: "billing_statement_2", label: "Billing statement / proof of address 2" },
  { id: "billing_statement_3", label: "Billing statement / proof of address 3" },
];

export const cameras: Camera[] = [
  {
    id: "ed46aa6b-60cf-4909-94e7-1fb1abab7e02",
    slug: "canon-eos-m100",
    name: "Canon EOS M100",
    shortName: "Canon M100",
    description:
      "A compact mirrorless camera for portraits, travel, school projects, and crisp everyday photos.",
    imagePath: "/cameras/canon-eos-m100/canon-eos-m100.jfif",
    priceOneToThreeDays: 549,
    priceFourPlusDays: 499,
    securityDeposit: 1000,
    inclusions: [
      "Micro SD Card",
      "Charger",
      "Battery",
      "OTG Card Reader for iPhone/Type-C",
      "Camera Bag",
      "Cleaning Kit",
      "Camera Lens Cap",
    ],
  },
  {
    id: "2162dd1a-e8f9-483d-9002-8e85702462ea",
    slug: "instax-mini-11",
    name: "Instax Mini 11",
    shortName: "Instax Mini",
    description:
      "A playful instant camera for birthdays, hangouts, keepsakes, and printed memories on the spot.",
    imagePath: "/cameras/instax-mini-11/instax-mini-11.webp",
    priceOneToThreeDays: 249,
    priceFourPlusDays: 199,
    securityDeposit: 1000,
    inclusions: ["Battery", "Camera Bag", "Cleaning Kit"],
    addons: [
      {
        name: "Instax Film",
        description: "1 box, 10 pcs",
        price: 550,
      },
    ],
  },
  {
    id: "b6b6452c-0c3c-467d-a1d2-105477bbbeca",
    slug: "kodak-pixpro-wpz2",
    name: "Kodak Pixpro WPZ2",
    shortName: "Kodak WPZ2",
    description:
      "A rugged waterproof camera for beach days, pool trips, and outdoor adventures.",
    imagePath: "/cameras/kodak-pixpro-wpz2/kodak-pixpro-wpz2.jfif",
    priceOneToThreeDays: 399,
    priceFourPlusDays: 349,
    securityDeposit: 1000,
    inclusions: [
      "Micro SD Card",
      "Charger",
      "Battery",
      "OTG Card Reader for iPhone/Type-C",
      "Camera Bag",
    ],
  },
];

export const bookingStatuses = [
  "Pending Review",
  "Payment Submitted",
  "Paid / Verified",
  "Approved",
  "Reserved",
  "Released",
  "Returned",
  "Completed",
];
