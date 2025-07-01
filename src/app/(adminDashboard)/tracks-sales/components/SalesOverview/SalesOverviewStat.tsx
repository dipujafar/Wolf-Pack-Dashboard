import { StatCard } from "@/components/shared/StatCard";
import React from "react";

const SalesOverviewStat = () => {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-3 gap-3 `}>
      <StatCard
        title="Total Revenue"
        value="€4,000"
        change={{ value: "+11.01%", positive: true }}
        className="bg-[#fff]/15 border border-[#EBEBEB]/50"
      />
      <StatCard
        title="Deals Closed"
        value="32"
        change={{ value: "+6.08%", positive: true }}
        className="bg-[#fff]/15 border border-[#EBEBEB]/50"
      />
      <StatCard
        title="Commission Paid"
        value="€1,000"
        change={{ value: "+6.08%", positive: true }}
        className="bg-[#fff]/15 border border-[#EBEBEB]/50"
      />
    </div>
  );
};

export default SalesOverviewStat;
