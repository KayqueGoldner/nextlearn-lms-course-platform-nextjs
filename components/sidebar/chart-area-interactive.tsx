"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive area chart";

const dummyEnrollmentsData = [
  { date: "2024-05-15", enrollments: 12 },
  { date: "2024-05-16", enrollments: 10 },
  { date: "2024-05-17", enrollments: 15 },
  { date: "2024-05-18", enrollments: 20 },
  { date: "2024-05-19", enrollments: 25 },
  { date: "2024-05-20", enrollments: 30 },
  { date: "2024-05-21", enrollments: 26 },
  { date: "2024-05-22", enrollments: 21 },
  { date: "2024-05-23", enrollments: 27 },
  { date: "2024-05-24", enrollments: 20 },
  { date: "2024-05-25", enrollments: 19 },
  { date: "2024-05-26", enrollments: 22 },
  { date: "2024-05-27", enrollments: 24 },
  { date: "2024-05-28", enrollments: 28 },
  { date: "2024-05-29", enrollments: 30 },
  { date: "2024-05-30", enrollments: 25 },
  { date: "2024-05-31", enrollments: 20 },
  { date: "2024-06-01", enrollments: 18 },
  { date: "2024-06-02", enrollments: 22 },
  { date: "2024-06-03", enrollments: 25 },
  { date: "2024-06-04", enrollments: 28 },
  { date: "2024-06-05", enrollments: 30 },
  { date: "2024-06-06", enrollments: 26 },
  { date: "2024-06-07", enrollments: 21 },
  { date: "2024-06-08", enrollments: 27 },
  { date: "2024-06-09", enrollments: 20 },
  { date: "2024-06-10", enrollments: 19 },
  { date: "2024-06-11", enrollments: 22 },
  { date: "2024-06-12", enrollments: 24 },
  { date: "2024-06-13", enrollments: 28 },
  { date: "2024-06-14", enrollments: 30 },
  { date: "2024-06-15", enrollments: 25 },
];

const chartConfig = {
  enrollments: {
    label: "Enrollments",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface ChartAreaInteractiveProps {
  data: {
    date: string;
    enrollments: number;
  }[];
}

export function ChartAreaInteractive({ data }: ChartAreaInteractiveProps) {
  const totalEnrollmentsNumber = React.useMemo(
    () => data.reduce((acc, curr) => acc + curr.enrollments, 0),
    [data],
  );

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Enrollments</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total enrollments for the last 30 days: {totalEnrollmentsNumber}
          </span>
          <span className="@[540px]/card:hidden">
            Last 30 days: {totalEnrollmentsNumber}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            margin={{
              left: 12,
              right: 12,
            }}
            data={data}
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval="preserveStartEnd"
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />

            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
              }
            />

            <Bar dataKey="enrollments" fill="var(--chart-1)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
