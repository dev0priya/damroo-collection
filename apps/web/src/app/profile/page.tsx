import { Card, Input, Button } from "@damroo/ui";

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-black">Profile</h1>
      <Card className="mt-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <Input defaultValue="Damroo Customer" />
          <Input defaultValue="customer@damroo.test" />
          <Input placeholder="Phone" />
          <Input placeholder="Default pincode" />
        </div>
        <Button className="mt-4">Save profile</Button>
      </Card>
    </div>
  );
}
