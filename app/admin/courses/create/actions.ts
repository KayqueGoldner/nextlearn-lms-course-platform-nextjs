"use server";

import { request } from "@arcjet/next";

import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { courseSchema, CourseSchemaType } from "@/lib/zod-schemas";
import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet, { fixedWindow } from "@/lib/arcjet";
import { stripe } from "@/lib/stripe";

const aj = arcjet.withRule(
  fixedWindow({
    mode: "LIVE",
    window: "1m",
    max: 5,
  }),
);

export async function CreateCourse(
  data: CourseSchemaType,
): Promise<ApiResponse> {
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

    const validation = courseSchema.safeParse(data);

    if (!validation.success) {
      return {
        status: "error",
        message: "Invalid Form Data",
      };
    }

    const createdProduct = await stripe.products.create({
      name: validation.data.title,
      description: validation.data.description,
      default_price_data: {
        currency: "usd",
        unit_amount: validation.data.price * 100,
      },
    });

    await prisma.course.create({
      data: {
        ...validation.data,
        userId: session.user.id,
        stripePriceId: createdProduct.default_price as string,
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
