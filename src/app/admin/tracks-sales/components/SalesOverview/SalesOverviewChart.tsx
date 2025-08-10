"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useGetCloserChartQuery } from "@/redux/api/metaApi";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Custom tooltip component for hover
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className='custom-tooltip bg-white p-3 shadow-md rounded-md border border-gray-100'>
        <p className='text-sm font-medium'>{payload[0].value.toLocaleString()} Revenue</p>
        <p className='text-xs text-gray-500'>{payload[0].payload.month}</p>
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

  return <rect x={x} y={y} width={width} height={height} fill={"#DDAD2E"} rx={4} ry={4} />;
};

export const SalesOverviewChart: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const startYear = 2024;

  // Ensure we start from 2024, and include the current year + next 3 years
  const yearsArray = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => startYear + index,
  );
  const [selectedYear, setSetSelectedYear] = useState(currentYear);
  const { data } = useGetCloserChartQuery([{ label: "year", value: String(selectedYear) }]);

  const chartData = data?.data || [];

  const formattedData = chartData.map((item: any) => ({
    month: (item.month as string).substring(0, 3),
    amount: item.amount,
  }));
  return (
    <Card className='w-full bg-[#F9F9FA]/15 border-none'>
      <CardHeader className=''>
        <div className='flex justify-between items-center mb-5'>
          <div className='flex-1 border-r-2 border-[#00000033]'>
            <CardTitle className='text-xl font-semibold flex items-center text-text-color'>
              Revenue Overview
            </CardTitle>
          </div>

          <div className='flex-1'>
            <div className='w-fit ml-auto '>
              <Popover>
                <PopoverTrigger className='rounded-full bg-white/20 text-white border-none' asChild>
                  <Button variant='outline' size='sm' className='h-8'>
                    {selectedYear} <ChevronDown className='ml-1 h-4 w-4' />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-24 p-0 bg-white/30 text-white border-none'>
                  <div className='flex flex-col'>
                    {yearsArray?.map((year) => (
                      <Button
                        onClick={() => setSetSelectedYear(year)}
                        key={year}
                        variant='ghost'
                        className='justify-start'
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
      <CardContent className='pt-0'>
        <div className='h-[400px] w-full'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              data={formattedData}
              margin={{ top: 20, right: 5, left: 0, bottom: 10 }}
              barCategoryGap={4}
              barGap={0}
            >
              <XAxis dataKey='month' axisLine={false} tickLine={false} tickMargin={10} dy={10} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={formatYAxisTick}
                tickMargin={10}
                domain={[0, 1000]}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ opacity: 0.1 }} />
              <Bar
                dataKey='amount'
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
