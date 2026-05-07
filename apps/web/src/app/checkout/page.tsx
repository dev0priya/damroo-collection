import { CreditCard } from "lucide-react";
import { Button, Card, Input } from "@damroo/ui";

export default function CheckoutPage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[1fr_360px]">
      <section>
        <h1 className="text-3xl font-black">Checkout</h1>
        <Card className="mt-5">
          <h2 className="font-black">Shipping address</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Input placeholder="Full name" />
            <Input placeholder="Phone" />
            <Input className="sm:col-span-2" placeholder="Address line 1" />
            <Input placeholder="City" />
            <Input placeholder="State" />
            <Input placeholder="Pincode" />
          </div>
        </Card>
        <Card className="mt-4">
          <h2 className="flex items-center gap-2 font-black"><CreditCard className="h-5 w-5" /> Payment</h2>
          <div className="mt-4 grid gap-3">
            <label className="rounded-md border border-stone-300 p-3"><input type="radio" name="payment" defaultChecked /> Razorpay UPI/Card/Netbanking</label>
            <label className="rounded-md border border-stone-300 p-3"><input type="radio" name="payment" /> Cash on delivery fallback</label>
          </div>
        </Card>
      </section>
      <Card>
        <h2 className="text-lg font-black">Order summary</h2>
        <p className="mt-3 text-sm text-stone-600">Razorpay order creation and signature verification are handled by the API before the order becomes paid.</p>
        <Button className="mt-5 w-full">Pay securely</Button>
      </Card>
    </div>
  );
}
