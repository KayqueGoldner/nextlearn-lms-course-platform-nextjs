import { getCourseSidebarData } from "@/app/data/course/get-course-sidebar-data";

import { CourseSidebar } from "../_components/course-sidebar";

interface CourseSlugLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

const CourseSlugLayout = async ({
  children,
  params,
}: CourseSlugLayoutProps) => {
  const { slug } = await params;

  const course = await getCourseSidebarData(slug);

  return (
    <div className="flex flex-1">
      {/* SIDEBAR  */}
      <div className="border-border w-80 shrink-0 border-r">
        <CourseSidebar course={course} />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
};

export default CourseSlugLayout;
