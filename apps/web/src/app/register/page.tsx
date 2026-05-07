import Link from "next/link";
import { Button, Card, Input } from "@damroo/ui";

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <Card>
        <h1 className="text-2xl font-black">Create account</h1>
        <div className="mt-5 grid gap-3">
          <Input placeholder="Name" />
          <Input placeholder="Email" type="email" />
          <Input placeholder="Phone" />
          <Input placeholder="Password" type="password" />
          <Button>Register</Button>
        </div>
        <p className="mt-4 text-sm text-stone-600">Already registered? <Link href="/login" className="font-bold text-brand-rose">Login</Link></p>
      </Card>
    </div>
  );
}
