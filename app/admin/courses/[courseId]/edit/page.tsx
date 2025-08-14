import { adminGetCourse } from "@/app/data/admin/admin-get-course";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { EditCourseForm } from "./_components/edit-course-form";

interface CourseIdEditPageProps {
  params: Promise<{ courseId: string }>;
}

const CourseIdEditPage = async ({ params }: CourseIdEditPageProps) => {
  const { courseId } = await params;
  const data = await adminGetCourse(courseId);

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        Edit Course:{" "}
        <span className="text-primary underline">{data.title}</span>
      </h1>

      <Tabs defaultValue="basic-info" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
          <TabsTrigger value="course-structure">Course Structure</TabsTrigger>
        </TabsList>

        <TabsContent value="basic-info">
          <Card>
            <CardHeader>
              <CardTitle>Basic Info</CardTitle>
              <CardDescription>
                Provide basic information about the course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EditCourseForm data={data} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseIdEditPage;
