"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useGetAllClosersQuery } from "@/redux/api/closerApi";
import { Pagination } from "antd";
import { TCloser, TResponse } from "@/types";
import moment from "moment";

const getStatusColor = (status: TCloser["status"]) => {
  switch (status) {
    case "New":
      return "bg-green-500 hover:bg-green-600";
    case "Open":
      return "bg-blue-500 hover:bg-blue-600";
    case "Closed":
      return "bg-red-500 hover:bg-red-600";
    default:
      return "bg-gray-500 hover:bg-gray-600";
  }
};

export default function DealsHistory({ id }: { id: string }) {
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data, isLoading } = useGetAllClosersQuery([
    { label: "userId", value: id },
    { label: "page", value: page.toString() },
    { label: "limit", value: limit.toString() },
  ]);

  const result = data?.data as TResponse<TCloser[]>;
  const meta = result?.meta;
  const closerData = result?.data;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div>
      {isLoading ? (
        <div className='text-white text-center py-10'>Loading deals...</div>
      ) : (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 '>
            {closerData?.map((project, index) => (
              <CloserCard key={index} closer={project} />
            ))}
          </div>
          {meta && meta.total > 0 && (
            <div className='flex justify-center mt-6'>
              <Pagination
                current={meta.page}
                total={meta.total}
                pageSize={meta.limit}
                onChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

const CloserCard = ({ closer }: { closer: TCloser }) => {
  const commissionEarn = closer?.amount * ((100 - closer?.client?.commissionRate) / 100);

  return (
    <Card key={closer?.id} className='bg-white/20 border-none text-white'>
      <CardContent className='p-4'>
        <div className='flex items-start justify-between mb-4'>
          <Badge
            className={`${getStatusColor(
              closer?.status === "NEW" ? "New" : closer?.status === "OPEN" ? "Open" : "Closed",
            )} text-white border-0 text-xs px-2 py-1 capitalize ml-auto`}
          >
            {closer?.status}
          </Badge>
        </div>

        <h3 className='text-lg font-semibold mb-4 text-white'>{closer?.client?.name}</h3>

        <div className='space-y-2 mb-6 text-sm text-gray-300'>
          <div className='flex justify-between'>
            <span>Deal Date </span>
            <span>{moment(closer?.dealDate).format("LL")}</span>
          </div>
          <div className='flex justify-between'>
            <span>Revenue Target </span>
            <span>{closer?.client?.revenueTarget}</span>
          </div>
          <div className='flex justify-between'>
            <span>Revenue Closed </span>
            <span>{closer?.amount}</span>
          </div>
          <div className='flex justify-between'>
            <span>Commission Earned </span>
            <span>{commissionEarn.toFixed(2)}</span>
          </div>
          <div className='flex justify-between'>
            <span>Commission Rate </span>
            <span>{closer?.client?.commissionRate}</span>
          </div>
        </div>

        <Link href={`/admin/closer/${closer?.id}/${closer.id}`}>
          <Button
            variant='outline'
            className='w-full bg-transparent border-white text-gray-300 hover:bg-gray-200 hover:text-black'
          >
            👁 View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
