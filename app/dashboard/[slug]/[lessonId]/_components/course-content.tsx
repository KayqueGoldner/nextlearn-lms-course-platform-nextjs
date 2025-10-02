"use client";

import { BookIcon, CheckCircleIcon } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

import { LessonContentType } from "@/app/data/course/get-lesson-content";
import { Button } from "@/components/ui/button";
import { RenderDescription } from "@/components/rich-text-editor/render-description";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { tryCatch } from "@/hooks/try-catch";
import { useConfetti } from "@/hooks/use-confetti";

import { markLessonComplete } from "../actions";

interface CourseContentProps {
  data: LessonContentType;
}

export const CourseContent = ({ data }: CourseContentProps) => {
  const [pending, startTransition] = useTransition();
  const { triggerConfetti } = useConfetti();

  const VideoPlayer = ({
    thumbnailKey,
    videoKey,
  }: {
    thumbnailKey: string;
    videoKey: string;
  }) => {
    const videoUrl = useConstructUrl(videoKey);
    const thumbnailUrl = useConstructUrl(thumbnailKey);

    if (!videoKey) {
      return (
        <div className="bg-muted flex aspect-video flex-col items-center justify-center rounded-lg">
          <BookIcon className="text-primary mx-auto mb-4 size-16" />
          <p className="text-muted-foreground">
            This lesson does not have a video yet.
          </p>
        </div>
      );
    }

    return (
      <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
        <video
          className="size-full object-cover"
          controls={true}
          poster={thumbnailUrl}
        >
          <source src={videoUrl} type="video/mp4" />
          <source src={videoUrl} type="video/webm" />
          <source src={videoUrl} type="video/ogg" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };

  const onSubmit = () => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        markLessonComplete(data.id, data.chapter.course.slug),
      );

      if (error) {
        toast.error(error.message);
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        triggerConfetti();
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="bg-background flex h-full flex-col pl-6">
      <VideoPlayer
        thumbnailKey={data.thumbnailKey ?? ""}
        videoKey={data.videoKey ?? ""}
      />

      <div className="border-b py-4">
        {data.lessonProgress.length > 0 ? (
          <Button
            variant="outline"
            className="bg-green-500/10 text-green-500 hover:text-green-600"
          >
            <CheckCircleIcon className="mr-2 size-4 text-green-500" />
            Completed
          </Button>
        ) : (
          <Button variant="outline" onClick={onSubmit} disabled={pending}>
            <CheckCircleIcon className="mr-2 size-4 text-green-500" />
            Mark as Complete
          </Button>
        )}
      </div>

      <div className="space-y-3 pt-3">
        <h1 className="text-foreground text-3xl font-bold tracking-tight">
          {data.title}
        </h1>
        {data.description && (
          <RenderDescription json={JSON.parse(data.description)} />
        )}
      </div>
    </div>
  );
};
