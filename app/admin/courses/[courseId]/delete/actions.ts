"use server";

import { revalidatePath } from "next/cache";
import { request } from "@arcjet/next";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import arcjet, { fixedWindow } from "@/lib/arcjet";

const aj = arcjet.withRule(
  fixedWindow({
    mode: "LIVE",
    window: "1m",
    max: 5,
  }),
);

export async function deleteCourse(courseId: string): Promise<ApiResponse> {
  const session = await requireAdmin();

  try {
    const req = await request();
    const decision = await aj.protect(req, {
      fingerprint: session.user.id,
    });

    if (decision.isDenied()) {
      const reason = decision.reason;

      if (reason.isRateLimit()) {
        return { status: "error", message: "Too many requests" };
      } else {
        return { status: "error", message: "Request denied" };
      }
    }

    await prisma.course.delete({
      where: {
        id: courseId,
      },
    });

    revalidatePath("/admin/courses");

    return {
      status: "success",
      message: "Course deleted successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      status: "error",
      message: "Failed to delete course.",
    };
  }
}
