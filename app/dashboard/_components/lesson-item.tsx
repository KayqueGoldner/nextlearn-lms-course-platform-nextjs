import Link from "next/link";
import { CheckIcon, PlayIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LessonItemProps {
  lesson: {
    id: string;
    title: string;
    position: number;
    description: string | null;
  };
  slug: string;
  isActive?: boolean;
  completed: boolean;
}

export const LessonItem = ({
  lesson,
  slug,
  isActive,
  completed,
}: LessonItemProps) => {
  return (
    <Link
      href={`/dashboard/${slug}/${lesson.id}`}
      className={buttonVariants({
        variant: completed ? "secondary" : "outline",
        className: cn(
          "h-auto w-full justify-start p-2.5 transition-all",
          completed &&
            "border-green-300 bg-green-100 text-green-800 hover:bg-green-200 dark:border-green-700 dark:bg-green-900/30 dark:text-green-200 dark:hover:bg-green-900/50",
          isActive &&
            !completed &&
            "bg-primary/10 dark:bg-primary/20 border-primary/50 hover:bg-primary/20 dark:hover:bg-primary/30 text-primary",
        ),
      })}
    >
      <div className="flex w-full min-w-0 items-center gap-2.5">
        <div className="shrink-0">
          {completed ? (
            <div className="flex size-5 items-center justify-center rounded-full bg-green-600 dark:bg-green-500">
              <CheckIcon className="size-3 text-white" />
            </div>
          ) : (
            <div
              className={cn(
                "bg-background flex size-5 items-center justify-center rounded-full border-2",
                isActive
                  ? "border-primary bg-primary/10 dark:bg-primary/20"
                  : "border-muted-foreground/60",
              )}
            >
              <PlayIcon
                className={cn(
                  "size-2.5 fill-current",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1 text-left">
          <p
            className={cn(
              "text-xs font-medium",
              completed
                ? "text-green-800 dark:text-green-200"
                : isActive
                  ? "text-primary font-semibold"
                  : "text-foreground",
            )}
          >
            {lesson.position}. {lesson.title}
          </p>

          {completed && (
            <p className="text-[10px] font-medium text-green-700 dark:text-green-300">
              Completed
            </p>
          )}

          {isActive && !completed && (
            <p className="text-primary text-[10px] font-medium">
              Curently watching
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
