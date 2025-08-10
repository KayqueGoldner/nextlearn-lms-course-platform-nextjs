"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { courseSchema, CourseSchemaType } from "@/lib/zod-schemas";

export async function CreateCourse(
  data: CourseSchemaType,
): Promise<ApiResponse> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        status: "error",
        message: "Unauthorized",
      };
    }

    const validation = courseSchema.safeParse(data);

    if (!validation.success) {
      return {
        status: "error",
        message: "Invalid Form Data",
      };
    }

    await prisma.course.create({
      data: {
        ...validation.data,
        userId: session.user.id,
      },
    });

    return {
      status: "success",
      message: "Course created successfully",
    };
  } catch (error) {
    console.log(error);

    return {
      status: "error",
      message: "Failed to create course",
    };
  }
}
