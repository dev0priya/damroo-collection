import { Button, Card } from "@damroo/ui";
import { orders } from "../../lib/data";
import { AdminTable } from "../../components/table";

export default function OrdersPage() {
  return (
    <div>
      <h1 className="text-3xl font-black">Order Management</h1>
      <Card className="mt-5">
        <h2 className="font-black">Status controls</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {["PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"].map((status) => <Button key={status} variant="secondary">{status}</Button>)}
        </div>
      </Card>
      <div className="mt-6 overflow-auto">
        <AdminTable headers={["Order", "Customer", "Total", "Status", "Payment"]} rows={orders.map((order) => [order.id, order.customer, order.total, order.status, order.payment])} />
      </div>
    </div>
  );
}
