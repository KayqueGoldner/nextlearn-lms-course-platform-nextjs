import { Suspense } from "react";

import { getLessonContent } from "@/app/data/course/get-lesson-content";

import { CourseContent } from "../[lessonId]/_components/course-content";
import { LessonSkeleton } from "../[lessonId]/_components/lesson-skeleton";

interface CourseSlugLessonIdPageProps {
  params: Promise<{ lessonId: string }>;
}

const CourseSlugLessonIdPage = async ({
  params,
}: CourseSlugLessonIdPageProps) => {
  const { lessonId } = await params;

  return (
    <Suspense fallback={<LessonSkeleton />}>
      <LessonContentLoader lessonId={lessonId} />
    </Suspense>
  );
};

export default CourseSlugLessonIdPage;

async function LessonContentLoader({ lessonId }: { lessonId: string }) {
  const data = await getLessonContent(lessonId);

  return <CourseContent data={data} />;
}
