import { Button, Card, Input } from "@damroo/ui";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <Card>
        <h1 className="text-2xl font-black">Admin Login</h1>
        <div className="mt-5 grid gap-3">
          <Input placeholder="admin@damroo.test" />
          <Input type="password" placeholder="Password" />
          <Button>Login as admin</Button>
        </div>
      </Card>
    </div>
  );
}
