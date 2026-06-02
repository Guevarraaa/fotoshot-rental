import type { BookingTotal, Camera } from "@/types/camera";

export function formatPeso(amount: number): string {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateRentalDays(startDate: string, endDate: string): number {
  if (!startDate || !endDate) {
    return 1;
  }

  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return 1;
  }

  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const diff = Math.floor((end.getTime() - start.getTime()) / millisecondsPerDay);

  return Math.max(diff + 1, 1);
}

export function calculateBookingTotal(
  camera: Camera,
  rentalDays: number,
  instaxFilmBoxes = 0,
): BookingTotal {
  const safeDays = Math.max(rentalDays, 1);
  const dailyRate =
    safeDays >= 4 ? camera.priceFourPlusDays : camera.priceOneToThreeDays;
  const rentalFee = dailyRate * safeDays;
  const instaxFilm = camera.addons?.find((addon) => addon.name === "Instax Film");
  const addonTotal = instaxFilm ? instaxFilm.price * instaxFilmBoxes : 0;

  return {
    rentalDays: safeDays,
    dailyRate,
    rentalFee,
    securityDeposit: camera.securityDeposit,
    addonTotal,
    totalAmount: rentalFee + camera.securityDeposit + addonTotal,
  };
}

