export type Camera = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  imagePath: string;
  priceOneToThreeDays: number;
  priceFourPlusDays: number;
  securityDeposit: number;
  inclusions: string[];
  addons?: {
    name: string;
    description: string;
    price: number;
  }[];
};

export type BookingTotal = {
  rentalDays: number;
  dailyRate: number;
  rentalFee: number;
  securityDeposit: number;
  addonTotal: number;
  totalAmount: number;
};

