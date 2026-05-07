import { Button } from "@damroo/ui";
import { AdminTable } from "../../components/table";

export default function UsersPage() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-black">User Management</h1>
        <Button variant="secondary">Export users</Button>
      </div>
      <div className="mt-6 overflow-auto">
        <AdminTable headers={["Name", "Email", "Role", "Status", "Orders"]} rows={[
          ["Damroo Admin", "admin@damroo.test", "ADMIN", "Active", 0],
          ["Aditi Sharma", "aditi@example.com", "CUSTOMER", "Active", 4],
          ["Rahul Mehta", "rahul@example.com", "CUSTOMER", "Active", 2]
        ]} />
      </div>
    </div>
  );
}
