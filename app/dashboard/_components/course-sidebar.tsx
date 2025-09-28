import { PlayIcon } from "lucide-react";

import { CourseSidebarData } from "@/app/data/course/get-course-sidebar-data";
import { Progress } from "@/components/ui/progress";

interface CourseSidebarProps {
  course: CourseSidebarData;
}

export const CourseSidebar = ({ course }: CourseSidebarProps) => {
  return (
    <div className="flex h-full flex-col">
      <div className="border-border border-b pr-4 pb-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-lg">
            <PlayIcon className="text-primary size-5" />
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base leading-tight font-semibold">
              {course.title}
            </h1>
            <p className="text-muted-foreground mt-1 truncate text-xs">
              {course.category}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">4/10 lessons</span>
          </div>

          <Progress value={55} className="h-1.5" />

          <p className="text-muted-foreground text-xs">55% completed</p>
        </div>
      </div>
    </div>
  );
};
