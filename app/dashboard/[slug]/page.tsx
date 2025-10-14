import { redirect } from "next/navigation";

import { getCourseSidebarData } from "@/app/data/course/get-course-sidebar-data";

interface CourseSlugPageProps {
  params: Promise<{ slug: string }>;
}

const CourseSlugPage = async ({ params }: CourseSlugPageProps) => {
  const { slug } = await params;

  const course = await getCourseSidebarData(slug);

  const firstChapter = course.chapter[0];
  const firstLesson = firstChapter.lessons[0];

  if (firstLesson) {
    redirect(`/dashboard/${slug}/${firstLesson.id}`);
  }

  return (
    <div className="flex h-full items-center justify-center text-center">
      <h2 className="mb-2 text-2xl font-bold">No lessons available</h2>
      <p className="text-muted-foreground">
        This course does not have any lessons yet. Please check back later.
      </p>
    </div>
  );
};

export default CourseSlugPage;
