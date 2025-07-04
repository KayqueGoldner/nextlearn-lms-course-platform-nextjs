"use client";

import { useState, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const VerifyRequestPage = () => {
  const [otp, setOtp] = useState("");
  const [verifyOtpPending, startVerifyOtpTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email") as string;
  const isOtpValid = otp.length === 6;

  function verifyOtp() {
    startVerifyOtpTransition(async () => {
      await authClient.signIn.emailOtp({
        email: email,
        otp: otp,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Email verified successfully");
            router.push("/");
          },
          onError: (error) => {
            toast.error(error.error.message);
          },
        },
      });
    });
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Verify your email</CardTitle>
        <CardDescription>
          We have sent a verification email code to your email address. Please
          open the email and paste the code here.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center gap-2">
          <InputOTP
            value={otp}
            onChange={(value) => setOtp(value)}
            maxLength={6}
            className="gap-2"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <p className="text-muted-foreground text-sm">
            Enter the 6-digit code sent to your email address.
          </p>
        </div>

        <Button
          className="w-full"
          onClick={verifyOtp}
          disabled={verifyOtpPending || !isOtpValid}
        >
          {verifyOtpPending ? (
            <>
              <Loader2Icon className="size-4 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <span>Verify Account</span>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default VerifyRequestPage;
