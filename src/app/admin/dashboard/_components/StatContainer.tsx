import { StatCard } from "@/components/shared/StatCard";
import React from "react";

const StatContainer = () => {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 `}>
      <StatCard
        title="Total Closer"
        value="200"
        change={{ value: "+11.01%", positive: true }}
        className="bg-[#fff]/15 border border-[#EBEBEB]/50"
      />
      <StatCard
        title="Total Client"
        value="500"
        change={{ value: "+6.08%", positive: true }}
         className="bg-[#fff]/15 border border-[#EBEBEB]/50"
      />
    </div>
  );
};

export default StatContainer;
