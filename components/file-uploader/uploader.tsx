"use client";

import { useCallback, useState } from "react";
import { type FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

import { RenderEmptyState, RenderErrorState } from "./render-state";

interface UploaderState {
  id: string | null;
  file: File | null;
  isUploading: boolean;
  progress: number;
  key?: string;
  isDeleting: boolean;
  error: boolean;
  objectUrl?: string;
  fileType: "image" | "video";
}

export const Uploader = () => {
  const [fileState, setFileState] = useState<UploaderState>({
    error: false,
    file: null,
    id: null,
    isUploading: false,
    progress: 0,
    isDeleting: false,
    fileType: "image",
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length <= 0) return;

    const file = acceptedFiles[0];
    setFileState({
      file: file,
      isUploading: false,
      progress: 0,
      objectUrl: URL.createObjectURL(file),
      error: false,
      id: uuidv4(),
      isDeleting: false,
      fileType: "image",
    });
  }, []);

  const uploadFile = (file: File) => {
    setFileState((prev) => ({
      ...prev,
      isUploading: true,
      progress: 0,
    }));
  };

  const rejectedFiles = (fileRejection: FileRejection[]) => {
    if (fileRejection.length) {
      const tooManyFiles = fileRejection.find(
        (rejection) => rejection.errors[0].code === "too-many-files",
      );
      const fileSizeTooBig = fileRejection.find(
        (rejection) => rejection.errors[0].code === "file-too-large",
      );

      if (tooManyFiles) {
        toast.error("Too many files selected, max is 1");
      }

      if (fileSizeTooBig) {
        toast.error("File size exceeds the limit, max is 5MB");
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5MB
    onDropRejected: rejectedFiles,
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative h-64 w-full border-2 border-dashed transition-colors duration-200 ease-in-out",
        isDragActive
          ? "border-primary bg-primary/10 border-solid"
          : "border-border hover:border-primary",
      )}
    >
      <CardContent className="flex size-full items-center justify-center p-4">
        <input {...getInputProps()} />
        <RenderEmptyState isDragActive={isDragActive} />
      </CardContent>
    </Card>
  );
};
