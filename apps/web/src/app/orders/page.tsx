import { Badge, Card } from "@damroo/ui";

export default function OrdersPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-black">My Orders</h1>
      <div className="mt-5 grid gap-4">
        {["PAID", "SHIPPED", "DELIVERED"].map((status, index) => (
          <Card key={status}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-black">DMR-20260505-00{index + 1}</p>
                <p className="mt-1 text-sm text-stone-600">2 items | Estimated delivery in 3-5 days</p>
              </div>
              <Badge tone={status === "DELIVERED" ? "success" : "warning"}>{status}</Badge>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-stone-100">
              <div className="h-full rounded-full bg-brand-leaf" style={{ width: `${55 + index * 20}%` }} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
