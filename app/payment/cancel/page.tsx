import { ArrowLeftIcon, XIcon } from "lucide-react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

const PaymentCancelPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-1 items-center justify-center">
      <Card className="w-[350px]">
        <CardContent>
          <div className="flex w-full justify-center">
            <XIcon className="size-12 rounded-full bg-red-500/30 p-2 text-red-500" />
          </div>

          <div className="mt-3 w-full text-center sm:mt-5">
            <h2 className="text-xl font-semibold">Payment Cancelled</h2>

            <p className="text-muted-foreground mt-2 text-sm tracking-tight text-balance">
              No worries, you won't be charged. Please try again.
            </p>

            <Link
              href="/"
              className={buttonVariants({ className: "mt-5 w-full" })}
            >
              <ArrowLeftIcon />
              Go back to Homepage
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentCancelPage;
