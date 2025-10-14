import { PublicCourseCard } from "@/app/(public)/_components/public-course-card";
import { CourseProgressCard } from "@/app/dashboard/_components/course-progress-card";
import { getAllCourses } from "@/app/data/course/get-all-courses";
import { getEnrolledCourses } from "@/app/data/user/get-enrolled-courses";
import { EmptyState } from "@/components/general/empty-state";

const DashboardPage = async () => {
  const [courses, enrolledCourses] = await Promise.all([
    getAllCourses(),
    getEnrolledCourses(),
  ]);

  const coursesNotEnrolled = courses.filter(
    (course) =>
      !enrolledCourses.some(
        ({ Course: enrolled }) => enrolled.id === course.id,
      ),
  );

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Enrolled Courses</h1>
        <p className="text-muted-foreground">
          Here you can see all the courses you have access to.
        </p>
      </div>

      {enrolledCourses.length === 0 ? (
        <EmptyState
          title="No courses purchased"
          description="You don't have any courses purchased yet."
          buttonText="Browse Courses"
          href="/courses"
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {enrolledCourses.map((course) => (
            <CourseProgressCard key={course.Course.id} data={course} />
          ))}
        </div>
      )}

      <section className="mt-10">
        <div className="mb-5 flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Available Courses</h1>
          <p className="text-muted-foreground">
            Here you can see all the courses you can purchase.
          </p>
        </div>

        {coursesNotEnrolled.length === 0 ? (
          <EmptyState
            title="No courses available"
            description="There are no courses available at the moment."
            buttonText="Browse Courses"
            href="/courses"
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {coursesNotEnrolled.map((course) => (
              <PublicCourseCard key={course.id} data={course} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default DashboardPage;
