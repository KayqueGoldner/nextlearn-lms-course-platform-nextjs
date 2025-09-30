import { getLessonContent } from "@/app/data/course/get-lesson-content";

import { CourseContent } from "../[lessonId]/_components/course-content";

interface CourseSlugLessonIdPageProps {
  params: Promise<{ lessonId: string }>;
}

const CourseSlugLessonIdPage = async ({
  params,
}: CourseSlugLessonIdPageProps) => {
  const { lessonId } = await params;
  const data = await getLessonContent(lessonId);

  return <CourseContent data={data} />;
};

export default CourseSlugLessonIdPage;
