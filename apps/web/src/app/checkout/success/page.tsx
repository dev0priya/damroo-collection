import Link from "next/link";
import { Button, Card } from "@damroo/ui";

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <Card>
        <h1 className="text-2xl font-black">Payment successful</h1>
        <p className="mt-3 text-stone-600">Your order has been placed and can be tracked from My Orders.</p>
        <Link href="/orders" className="mt-5 block"><Button>Track order</Button></Link>
      </Card>
    </div>
  );
}
