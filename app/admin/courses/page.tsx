import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

const AdminCoursesPage = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Courses</h1>

        <Link href="/admin/courses/create" className={buttonVariants()}>
          Create Course
        </Link>
      </div>

      <div>
        <h1>Here you will see all of the courses</h1>
      </div>
    </>
  );
};

export default AdminCoursesPage;
