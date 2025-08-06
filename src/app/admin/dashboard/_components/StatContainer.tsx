"use client";
import { StatCard } from "@/components/shared/StatCard";
import { useGetMetaCountQuery } from "@/redux/api/metaApi";
import { TMetaCount } from "@/types";
import React from "react";

const StatContainer = () => {
  const { data } = useGetMetaCountQuery([]);
  const stackData = data?.data as TMetaCount;
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 `}>
      <StatCard
        title='Total Closer'
        value={stackData?.totalCloser}
        change={{ value: "+11.01%", positive: true }}
        className='bg-[#fff]/15 border border-[#EBEBEB]/50'
      />
      <StatCard
        title='Total Client'
        value={stackData?.totalClient}
        change={{ value: "+6.08%", positive: true }}
        className='bg-[#fff]/15 border border-[#EBEBEB]/50'
      />
    </div>
  );
};

export default StatContainer;
