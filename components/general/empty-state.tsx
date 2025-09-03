import Link from "next/link";
import { BanIcon, PlusCircleIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export const EmptyState = ({
  buttonText,
  description,
  title,
  href,
}: EmptyStateProps) => {
  return (
    <div className="animate-in fade-in-50 flex h-full flex-1 flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
      <div className="bg-primary/10 flex size-20 items-center justify-center rounded-full">
        <BanIcon className="text-primary size-10" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">{title}</h2>
      <p className="text-muted-foreground mt-2 mb-8 text-center text-sm leading-tight">
        {description}
      </p>
      <Link href={href} className={buttonVariants()}>
        <PlusCircleIcon className="mr-2 size-4" />
        {buttonText}
      </Link>
    </div>
  );
};
