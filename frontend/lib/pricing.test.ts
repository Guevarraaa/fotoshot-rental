import { describe, expect, it } from "vitest";
import { calculateRentalDays, calculateBookingTotal } from "./pricing";
import { cameras } from "./constants";

describe("pricing", () => {
  it("counts same-day rental as one billable day", () => {
    expect(calculateRentalDays("2026-06-02", "2026-06-02")).toBe(1);
  });

  it("uses the one to three day rate for short Canon rentals", () => {
    const total = calculateBookingTotal(cameras[0], 3, 0);

    expect(total.rentalFee).toBe(1647);
    expect(total.securityDeposit).toBe(1000);
    expect(total.totalAmount).toBe(2647);
  });

  it("uses the four plus day rate and adds Instax film boxes", () => {
    const total = calculateBookingTotal(cameras[1], 4, 2);

    expect(total.rentalFee).toBe(796);
    expect(total.addonTotal).toBe(1100);
    expect(total.totalAmount).toBe(2896);
  });
});
