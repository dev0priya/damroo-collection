import { describe, expect, it } from "vitest";
import { calculateOrderTotals, verifyRazorpaySignature } from "./services.js";
import crypto from "node:crypto";

describe("calculateOrderTotals", () => {
  it("adds shipping under free-shipping threshold and 5 percent tax", () => {
    expect(calculateOrderTotals([{ price: 100000, quantity: 1 }])).toEqual({
      subtotal: 100000,
      shippingFee: 9900,
      tax: 5000,
      total: 114900
    });
  });

  it("removes shipping above threshold", () => {
    expect(calculateOrderTotals([{ price: 200000, quantity: 1 }]).shippingFee).toBe(0);
  });
});

describe("verifyRazorpaySignature", () => {
  it("validates razorpay HMAC signatures", () => {
    const secret = "test-secret";
    const razorpayOrderId = "order_123";
    const razorpayPaymentId = "pay_123";
    const razorpaySignature = crypto.createHmac("sha256", secret).update(`${razorpayOrderId}|${razorpayPaymentId}`).digest("hex");
    expect(verifyRazorpaySignature({ razorpayOrderId, razorpayPaymentId, razorpaySignature, secret })).toBe(true);
  });
});
