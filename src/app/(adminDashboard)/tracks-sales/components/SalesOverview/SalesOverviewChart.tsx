"use client";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

// Sample data for the user overview chart - matches the image pattern
const userData = [
  { month: "Jan", users: 15000, color: "#a78bfa" }, // Light purple
  { month: "Feb", users: 28000, color: "#FEDE8C" }, // Teal
  { month: "Mar", users: 20000, color: "#fff" }, // Black
  { month: "Apr", users: 27000, color: "#93c5fd" }, // Blue
  { month: "May", users: 12000, color: "#93c5fd" }, // Blue
  { month: "Jun", users: 22000, color: "#86efac" }, // Green
  { month: "Jul", users: 15000, color: "#a78bfa" }, // Light purple
  { month: "Aug", users: 26000, color: "#67e8f9" }, // Teal
  { month: "Sep", users: 20000, color: "#000000" }, // Black
  { month: "Oct", users: 30000, color: "#93c5fd" }, // Blue
  { month: "Nov", users: 12000, color: "#93c5fd" }, // Blue
  { month: "Dec", users: 22000, color: "#86efac" }, // Green
];

// Custom tooltip component for hover
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-white p-3 shadow-md rounded-md border border-gray-100">
        <p className="text-sm font-medium">
          {payload[0].value.toLocaleString()} users
        </p>
        <p className="text-xs text-gray-500">{payload[0].payload.month}</p>
      </div>
    );
  }
  return null;
};

// Format y-axis ticks to show 'K' for thousands
const formatYAxisTick = (value: number) => {
  if (value === 0) return "0";
  return `${value / 1000}K`;
};

// Custom bar component to use the color from data
const CustomBar = (props: any) => {
  const { x, y, width, height, fill, dataKey, payload } = props;

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={"#DDAD2E"}
      rx={4}
      ry={4}
    />
  );
};

export const SalesOverviewChart: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const lastFiveYears = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const [selectedYear, setSetSelectedYear] = useState(currentYear);
  return (
    <Card className="w-full bg-[#F9F9FA]/15 border-none">
      <CardHeader className="">
        <div className="flex justify-between items-center mb-5">
          <div className="flex-1 border-r-2 border-[#00000033]">
            <CardTitle className="text-xl font-semibold flex items-center text-text-color">
              Revenue Overview
            </CardTitle>
          </div>

          <div className="flex-1">
            <div className="w-fit ml-auto ">
              <Popover>
                <PopoverTrigger
                  className="rounded-full bg-white/20 text-white border-none"
                  asChild
                >
                  <Button variant="outline" size="sm" className="h-8">
                    {selectedYear} <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-24 p-0 bg-white/30 text-white border-none">
                  <div className="flex flex-col">
                    {lastFiveYears?.map((year) => (
                      <Button
                        onClick={() => setSetSelectedYear(year)}
                        key={year}
                        variant="ghost"
                        className="justify-start"
                      >
                        {year}
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={userData}
              margin={{ top: 20, right: 5, left: 0, bottom: 5 }}
              barCategoryGap={4}
              barGap={0}
            >
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={formatYAxisTick}
                tickMargin={10}
                domain={[0, 30000]}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ opacity: 0.1 }} />
              <Bar
                dataKey="users"
                shape={<CustomBar />}
                isAnimationActive={true}
                barSize={35}
                radius={[10, 0, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
