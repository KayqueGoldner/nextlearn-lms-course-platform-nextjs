"use client";

import { CloudUploadIcon, ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const RenderEmptyState = ({
  isDragActive,
}: {
  isDragActive: boolean;
}) => {
  return (
    <div className="text-center">
      <div className="bg-muted mx-auto mb-4 flex size-12 items-center justify-center rounded-full">
        <CloudUploadIcon
          className={cn(
            "text-muted-foreground size-6",
            isDragActive && "text-primary",
          )}
        />
      </div>

      <p className="text-foreground text-base font-semibold">
        Drop your files or{" "}
        <span className="text-primary cursor-pointer font-bold">
          click to upload
        </span>
      </p>

      <Button type="button" className="mt-4">
        Select File
      </Button>
    </div>
  );
};

export const RenderErrorState = () => {
  return (
    <div className="text-center">
      <div className="bg-destructive/30 mx-auto mb-4 flex size-12 items-center justify-center rounded-full">
        <ImageIcon className={cn("text-destructive size-6")} />
      </div>

      <p className="text-base font-semibold">Upload Failed</p>

      <p className="text-muted-foreground mt-1 text-xs">Something went wrong</p>

      <Button type="button" size="sm" className="mt-4">
        Retry File Selection
      </Button>
    </div>
  );
};
