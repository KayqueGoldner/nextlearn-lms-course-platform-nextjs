import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { adminGetCourses } from "@/app/data/admin/admin-get-courses";

import { AdminCourseCard } from "./_components/admin-course-card";

const AdminCoursesPage = async () => {
  const data = await adminGetCourses();

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Courses</h1>

        <Link href="/admin/courses/create" className={buttonVariants()}>
          Create Course
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
        {data.map((course) => (
          <AdminCourseCard key={course.id} data={course} />
        ))}
      </div>
    </>
  );
};

export default AdminCoursesPage;
