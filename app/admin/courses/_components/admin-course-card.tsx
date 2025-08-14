import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  EyeIcon,
  MoreVerticalIcon,
  PencilIcon,
  SchoolIcon,
  TimerIcon,
  Trash2Icon,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { AdminGetCourses } from "@/app/data/admin/admin-get-courses";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminCourseCardProps {
  data: AdminGetCourses;
}

export const AdminCourseCard = ({ data }: AdminCourseCardProps) => {
  const thumbnailUrl = useConstructUrl(data.fileKey);

  return (
    <Card className="group relative gap-0 py-0">
      <div className="absolute top-2 right-2 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
              <MoreVerticalIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${data.id}/edit`}>
                <PencilIcon className="mr-2 size-4" />
                Edit Course
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/courses/${data.slug}`}>
                <EyeIcon className="mr-2 size-4" />
                Preview
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${data.id}/delete`}>
                <Trash2Icon className="text-destructive mr-2 size-4" />
                Delete Course
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Image
        src={thumbnailUrl}
        alt="thumbnail"
        width={600}
        height={400}
        className="aspect-video size-full rounded-t-lg object-cover"
      />

      <CardContent className="p-4">
        <Link
          href={`/admin/courses/${data.id}`}
          className="group-hover:text-primary line-clamp-2 text-lg font-medium transition-colors hover:underline"
        >
          {data.title}
        </Link>

        <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-tight">
          {data.smallDescription}
        </p>

        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <TimerIcon className="text-primary bg-primary/10 size-6 rounded-md p-1" />
            <p className="text-muted-foreground text-sm">{data.duration}h</p>
          </div>

          <div className="flex items-center gap-x-2">
            <SchoolIcon className="text-primary bg-primary/10 size-6 rounded-md p-1" />
            <p className="text-muted-foreground text-sm">{data.level}</p>
          </div>
        </div>

        <Link
          href={`/admin/courses/${data.id}/edit`}
          className={buttonVariants({ className: "mt-4 w-full" })}
        >
          Edit Course <ArrowRightIcon className="size-4" />
        </Link>
      </CardContent>
    </Card>
  );
};
