"use client";

import { ArrowLeftIcon, CheckIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { useConfetti } from "@/hooks/use-confetti";

const PaymentSuccessPage = () => {
  const { triggerConfetti } = useConfetti();

  useEffect(() => {
    triggerConfetti();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-1 items-center justify-center">
      <Card className="w-[350px]">
        <CardContent>
          <div className="flex w-full justify-center">
            <CheckIcon className="size-12 rounded-full bg-green-500/30 p-2 text-green-500" />
          </div>

          <div className="mt-3 w-full text-center sm:mt-5">
            <h2 className="text-xl font-semibold">Payment Successful</h2>

            <p className="text-muted-foreground mt-2 text-sm tracking-tight text-balance">
              Your payment was successful. You should now have the course.
            </p>

            <Link
              href="/dashboard"
              className={buttonVariants({ className: "mt-5 w-full" })}
            >
              <ArrowLeftIcon />
              Go to Dashboard
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;
