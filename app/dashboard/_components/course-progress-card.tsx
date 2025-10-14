"use client";

import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EnrolledCourseType } from "@/app/data/user/get-enrolled-courses";
import { useCourseProgress } from "@/hooks/use-course-progress";
import { Progress } from "@/components/ui/progress";

interface PublicCourseCardProps {
  data: EnrolledCourseType;
}

export const CourseProgressCard = ({ data }: PublicCourseCardProps) => {
  const thumbnailUrl = useConstructUrl(data.Course.fileKey);
  const { totalLessons, completedLessons, progressPercentage } =
    useCourseProgress({
      courseData: data.Course as any,
    });

  return (
    <Card className="group relative gap-0 py-0">
      <Badge className="absolute top-2 right-2 z-10">{data.Course.level}</Badge>

      <Image
        src={thumbnailUrl}
        width={600}
        height={400}
        alt="thumbnail image"
        className="aspect-video size-full rounded-t-xl object-cover"
      />

      <CardContent className="p-4">
        <Link
          href={`/dashboard/${data.Course.slug}`}
          className="group-hover:text-primary line-clamp-2 text-lg font-medium transition-colors hover:underline"
        >
          {data.Course.title}
        </Link>

        <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-tight">
          {data.Course.smallDescription}
        </p>

        <div className="mt-5 space-y-4">
          <div className="mb-1 flex justify-between text-sm">
            <p>Progress:</p>
            <p className="font-medium">{progressPercentage}%</p>
          </div>

          <Progress value={progressPercentage} className="h-1.5" />

          <p className="text-muted-foreground mt-1 text-xs">
            {completedLessons} of {totalLessons} lessons completed
          </p>
        </div>

        <Link
          href={`/dashboard/${data.Course.slug}`}
          className={buttonVariants({ className: "mt-4 w-full" })}
        >
          Learn More
        </Link>
      </CardContent>
    </Card>
  );
};

export function PublicCourseCardSkeleton() {
  return (
    <Card className="group relative gap-0 py-0">
      <div className="absolute top-2 right-2 z-10 flex items-center">
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      <div className="relative h-fit w-full">
        <Skeleton className="aspect-video w-full rounded-t-xl" />
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>

        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <Skeleton className="size-6 rounded-md" />
            <Skeleton className="h-4 w-8" />
          </div>

          <div className="flex items-center gap-x-2">
            <Skeleton className="size-6 rounded-md" />
            <Skeleton className="h-4 w-8" />
          </div>
        </div>

        <Skeleton className="mt-4 h-10 w-full rounded-md" />
      </CardContent>
    </Card>
  );
}
