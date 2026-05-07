import { Badge, Card } from "@damroo/ui";
import { metrics, orders, products } from "../lib/data";
import { AdminTable } from "../components/table";

export default function DashboardPage() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black">Dashboard</h1>
          <p className="mt-1 text-sm text-stone-600">Revenue, catalog, users, low-stock alerts, and order operations.</p>
        </div>
        <Badge tone="success">Admin protected</Badge>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <p className="text-sm font-semibold text-stone-500">{metric.label}</p>
            <p className="mt-2 text-2xl font-black">{metric.value}</p>
            <p className="mt-2 text-sm text-stone-600">{metric.detail}</p>
          </Card>
        ))}
      </div>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-black">Recent orders</h2>
        <AdminTable headers={["Order", "Customer", "Total", "Status", "Payment"]} rows={orders.map((order) => [order.id, order.customer, order.total, order.status, order.payment])} />
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-black">Low stock watch</h2>
        <AdminTable headers={["Product", "SKU", "Category", "Stock", "Status"]} rows={products.map((product) => [product.name, product.sku, product.category, product.stock, product.status])} />
      </section>
    </div>
  );
}
