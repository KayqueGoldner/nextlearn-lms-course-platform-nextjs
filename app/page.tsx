"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ThemeToggle } from "@/components/theme-toggle";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out successfully");
          router.push("/login");
        },
      },
    });
  }
  return (
    <div>
      <h1 className="text-3xl font-bold text-yellow-500">Hello World</h1>
      <ThemeToggle />

      {session ? (
        <div className="flex w-max flex-col gap-4">
          <p>Signed in as {session.user.name}</p>
          <Button onClick={signOut}>Sign out</Button>
        </div>
      ) : (
        <Link href="/login">Sign in</Link>
      )}
    </div>
  );
}
