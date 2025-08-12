"use client";
import { StatCard } from "@/components/shared/StatCard";
import { useGetMetaCountQuery } from "@/redux/api/metaApi";
import { TMetaCount } from "@/types";
import React from "react";

const SalesOverviewStat = () => {
  const { data } = useGetMetaCountQuery([]);
  const stackData = data?.data as TMetaCount;

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-3 gap-3 `}>
      <StatCard
        title='Total Revenue'
        value={stackData?.totalRevenue}
        change={{ value: "+11.01%", positive: true }}
        className='bg-[#fff]/15 border border-[#EBEBEB]/50'
      />
      <StatCard
        title='Deals Closed'
        value={stackData?.totalDealClosed}
        change={{ value: "+6.08%", positive: true }}
        className='bg-[#fff]/15 border border-[#EBEBEB]/50'
      />
      <StatCard
        title='Commission Paid'
        value={stackData?.totalCommissionPaid}
        change={{ value: "+6.08%", positive: true }}
        className='bg-[#fff]/15 border border-[#EBEBEB]/50'
      />
    </div>
  );
};

export default SalesOverviewStat;
