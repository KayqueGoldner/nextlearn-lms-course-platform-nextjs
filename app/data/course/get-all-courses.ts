import "server-only";

import { prisma } from "@/lib/db";

export async function getAllCourses() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const data = await prisma.course.findMany({
    where: {
      status: "Published",
    },
    select: {
      title: true,
      price: true,
      smallDescription: true,
      fileKey: true,
      id: true,
      slug: true,
      level: true,
      duration: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export type GetAllCourses = Awaited<ReturnType<typeof getAllCourses>>;
