"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

export function useSignOut() {
  const router = useRouter();

  const handleSignOut = async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out successfully");
          router.push("/login");
        },
        onError: () => {
          toast.error("Failed to sign out");
        },
      },
    });
  };

  return handleSignOut;
}
