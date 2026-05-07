import crypto from "node:crypto";

export function calculateOrderTotals(items: Array<{ price: number; quantity: number }>) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = subtotal >= 199900 ? 0 : 9900;
  const tax = Math.round(subtotal * 0.05);
  return { subtotal, shippingFee, tax, total: subtotal + shippingFee + tax };
}

export function createOrderNumber() {
  return `DMR-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

export function verifyRazorpaySignature({
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
  secret
}: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  secret: string;
}) {
  const body = `${razorpayOrderId}|${razorpayPaymentId}`;
  const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(razorpaySignature));
}
