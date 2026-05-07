import Link from "next/link";
import { Button, Card, Input } from "@damroo/ui";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <Card>
        <h1 className="text-2xl font-black">Login</h1>
        <div className="mt-5 grid gap-3">
          <Input placeholder="Email" type="email" />
          <Input placeholder="Password" type="password" />
          <Button>Login</Button>
        </div>
        <p className="mt-4 text-sm text-stone-600">New here? <Link href="/register" className="font-bold text-brand-rose">Create account</Link></p>
      </Card>
    </div>
  );
}
