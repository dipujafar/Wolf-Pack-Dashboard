import { GownIcon } from "@/icons";
import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import CountUp from "react-countup";

interface StatCardProps {
  title: string;
  value: string | number;
  change: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

export function StatCard({ title, value, change, className }: StatCardProps) {
  return (
    <div className={cn("rounded-2xl p-6 flex flex-col gap-1 text-white", className)}>
      <h3 className='text-sm  font-medium'>{title}</h3>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-3xl font-semibold'>
            <CountUp end={typeof value === "string" ? parseInt(value) : value} />
          </p>
          {/*<p className="mt-1">Last 30 days</p>*/}
        </div>

        {/*<div
          className={cn(
            "flex items-center text-sm gap-x-2 font-medium",
            change.positive ? "text-emerald-400" : "text-rose-600"
          )}
        >
          <span>{change.value}</span>
          <GownIcon className={"text-emerald-400"} />
        </div>*/}
      </div>
    </div>
  );
}
