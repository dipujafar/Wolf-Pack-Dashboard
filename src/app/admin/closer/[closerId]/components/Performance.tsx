"use client";
import { Card, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { earningData } from "@/data";
import { useState } from "react";
import { useGetSingleUserSalesOverviewQuery } from "@/redux/api/metaApi";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className='custom-tooltip bg-white p-3 shadow-md rounded-md border border-gray-100'>
        <p className='text-sm font-medium text-black'>${payload[0].value.toLocaleString()}</p>
        <p className='text-xs text-gray-500'>{payload[0].payload.month}</p>
      </div>
    );
  }
  return null;
};

interface EarningsChartProps {
  className?: string;
  id: string;
}

const Performance = ({ className, id }: EarningsChartProps) => {
  const currentYear = new Date().getFullYear();
  const startYear = 2024;

  // Ensure we start from 2024, and include the current year + next 3 years
  const yearsArray = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => startYear + index,
  );
  const [selectedYear, setSetSelectedYear] = useState(currentYear);

  const { data } = useGetSingleUserSalesOverviewQuery({
    id,
    query: [{ label: "year", value: selectedYear.toString() }],
  });

  const chartData = data?.data || [];
console.log(chartData);
  const formattedData = chartData.map((item: any) => ({
    month: (item.month as string).substring(0, 3),
    amount: item.amount,
  }));

  return (
    <Card className={`p-6 bg-[#F9F9FA]/15 border-none rounded-2xl  ${className}`}>
      <div className='flex justify-between items-center mb-5'>
        <div className='flex-1 '>
          <CardTitle className='text-xl font-semibold flex items-center text-text-color'>
            Performance Overview
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

      <div>
        <ChartContainer
          config={{
            expense: { theme: { light: "#F9F9FA", dark: "#EEEEEFss" } }, // Rose
          }}
          className='h-[350px] w-full'
        >
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart
              data={formattedData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              className='h-[300px]'
            >
              <defs>
                <linearGradient id='colorExpense' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='20%' stopColor='#DDAD2E' opacity={0.9} />
                  <stop offset='80%' stopColor='#fff' stopOpacity={0.08} />
                </linearGradient>
              </defs>
              <XAxis dataKey='month' axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <ChartTooltip content={<CustomTooltip />} />

              <Area
                type='monotone'
                dataKey='amount'
                stroke='#FCB806'
                strokeWidth={1}
                fillOpacity={1}
                fill='url(#colorExpense)'
                activeDot={{
                  r: 6,
                  fill: "#fff",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </Card>
  );
};

export default Performance;
