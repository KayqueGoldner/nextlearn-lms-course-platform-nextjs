import { LessonForm } from "./_components/lesson-form";
import { adminGetLesson } from "@/app/data/admin/admin-get-lesson";

interface LessonIdPageProps {
  params: Promise<{ courseId: string; chapterId: string; lessonId: string }>;
}

const LessonIdPage = async ({ params }: LessonIdPageProps) => {
  const { chapterId, courseId, lessonId } = await params;
  const lesson = await adminGetLesson(lessonId);

  return <LessonForm data={lesson} chapterId={chapterId} courseId={courseId} />;
};

export default LessonIdPage;
