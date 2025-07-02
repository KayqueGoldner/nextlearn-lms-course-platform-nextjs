"use client";

import { GithubIcon, Loader } from "lucide-react";
import { toast } from "sonner";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

export function LoginForm() {
  const [signInPending, startSignInTransition] = useTransition();

  async function signInWithGitHub() {
    startSignInTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in successfully");
          },
          onError: (error) => {
            toast.error(error.error.message);
          },
        },
      });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Welcome Back</CardTitle>
        <CardDescription>
          Login with your GitHub or Email Account
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={signInWithGitHub}
          disabled={signInPending}
        >
          {signInPending ? (
            <>
              <Loader className="size-4 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <GithubIcon className="size-4" />
              <span>Sign in with GitHub</span>
            </>
          )}
        </Button>

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-card text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>

        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="m@example.com" />
          </div>

          <Button>Continue with Email</Button>
        </div>
      </CardContent>
    </Card>
  );
}
