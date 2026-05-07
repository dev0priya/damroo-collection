import { Button, Card, Input } from "@damroo/ui";
import { AdminTable } from "../../components/table";

export default function PagesPage() {
  return (
    <div>
      <h1 className="text-3xl font-black">Page Content Management</h1>
      <Card className="mt-5">
        <h2 className="font-black">Static page editor</h2>
        <div className="mt-4 grid gap-3">
          <Input placeholder="Title" />
          <Input placeholder="Slug" />
          <textarea className="min-h-36 rounded-md border border-stone-300 p-3 text-sm outline-none focus:ring-2 focus:ring-stone-950" placeholder="Page body" />
        </div>
        <Button className="mt-4">Publish page</Button>
      </Card>
      <div className="mt-6 overflow-auto">
        <AdminTable headers={["Title", "Slug", "Status", "Last updated"]} rows={[["About Damroo", "about", "PUBLISHED", "Today"], ["Contact", "contact", "PUBLISHED", "Today"], ["Policies", "policies", "PUBLISHED", "Today"]]} />
      </div>
    </div>
  );
}
