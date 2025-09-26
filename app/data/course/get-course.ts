import "server-only";

import { notFound } from "next/navigation";

import { prisma } from "@/lib/db";

export async function getCourse(slug: string) {
  const course = await prisma.course.findUnique({
    where: {
      slug,
    },
    select: {
      title: true,
      price: true,
      smallDescription: true,
      description: true,
      fileKey: true,
      id: true,
      slug: true,
      level: true,
      duration: true,
      category: true,
      chapter: {
        select: {
          id: true,
          title: true,
          lessons: {
            select: {
              id: true,
              title: true,
            },
            orderBy: {
              position: "asc",
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    return notFound();
  }

  return course;
}
