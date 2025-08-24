"use client";
import { Button } from "@/components/ui/button";
import { Error_Modal, Success_model } from "@/lib/utils";
import { useGetAllClosersQuery, useUpdateCloserMutation } from "@/redux/api/closerApi";
import { useDebounced } from "@/redux/hooks";
import { TCloser, TResponse } from "@/types";
import DataTable from "@/utils/DataTable";
import { Input, type TableProps } from "antd";
import { Download, Eye, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DealContainer = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(11);
  const [search, setSearch] = useState("");
  const searchTerm = useDebounced({ value: search, delay: 300 });

  const router = useRouter();

  const [updateCloser, { isLoading: isUpdating }] = useUpdateCloserMutation();

  const handleUpdateCloser = async ({ id, status }: { id: string; status: string }) => {
    try {
      await updateCloser({ id, data: { status } }).unwrap();
      Success_model({ title: "Closer updated successfully" });
      router.push("/admin/deals");
    } catch (error: any) {
      console.log(error);
      Error_Modal({ title: error?.data?.message });
    }
  };

  const { data, isLoading } = useGetAllClosersQuery([
    { label: "page", value: page.toString() },
    { label: "limit", value: pageSize.toString() },
    { label: "searchTerm", value: searchTerm.toString() },
    { label: "status", value: "OPEN" },
  ]);

  const closerData = data?.data as TResponse<TCloser[]>;
  const meta = closerData?.meta;
  const closerList = closerData?.data || [];

  const columns: TableProps<TCloser>["columns"] = [
    {
      title: "Serial",
      dataIndex: "id",
      //align: "center",
      width: 80,
      render: (_: any, __: TCloser, index: number) => (
        <span className='text-white'>#{index + 1}</span>
      ),
    },
    {
      title: "Client Name",
      dataIndex: ["client", "name"],
      //align: "center",
      render: (name: string) => <span className='text-white'>{name}</span>,
    },
    {
      title: "Closer Name",
      dataIndex: ["user", "name"],
      //align: "center",
      render: (name: string) => <span className='text-white'>{name}</span>,
    },
    {
      title: "Deal Amount",
      dataIndex: "amount",
      //align: "center",
      render: (amount: number) => <span className='text-white'>€{amount?.toLocaleString()}</span>,
    },
    {
      title: "Closer Earning",
      dataIndex: "amount",
      //align: "center",
      render: (amount: number, record) => (
        <span className='text-white'>
          €{(amount * (record?.client?.commissionRate / 100)).toLocaleString()}
        </span>
      ),
    },
    //{
    //  title: "Admin Earning",
    //  dataIndex: "amount",
    //  align: "center",
    //  render: (amount: number) => (
    //    <span className='text-white'>€{(amount * 0.2).toLocaleString()}</span>
    //  ),
    //},
    {
      title: "Date & Time",
      dataIndex: "dealDate",
      //align: "center",
      render: (date: string) => (
        <span className='text-white'>
          {new Date(date).toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      //align: "center",
      render: (_, record) => (
        <div className='text-white flex items-center gap-x-4'>
          <Link href={`/admin/deals/${record.id}`}>
            <Eye size={22} color='#78C0A8' className='cursor-pointer' />
          </Link>
          <Button
            onClick={() => handleUpdateCloser({ id: record.id, status: "CLOSED" })}
            size={"sm"}
            disabled={isUpdating}
            className='bg-green-600 border-green-600 hover:bg-green-700'
          >
            Approve Deal
          </Button>
        </div>
      ),
    },
  ];

  // Download JSON Function
  const handleExport = () => {
    const jsonString = JSON.stringify(closerList, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `closers_${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className='mx-auto space-y-6'>
        {/* Commission Rate Section */}
        {/*<div className='space-y-4'>
          <h2 className='text-white text-xl font-semibold'>Set Commission Rate</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div>
              <label className='text-gray-400 text-sm'>Closer Commission (%)</label>
              <Input
                placeholder='e.g. 10%'
                className='!bg-transparent !text-white !border !border-[#FCB806] !py-3'
              />
            </div>
            <div>
              <label className='text-gray-400 text-sm'>Admin Commission (%)</label>
              <Input
                placeholder='e.g. 20%'
                className='!bg-transparent !text-white !border !border-[#FCB806] !py-3'
              />
            </div>
            <div className='space-y-2'>
              <label className='text-gray-400 text-sm opacity-0'>Save</label>
              <Button
                className='!bg-[#FCB806] !text-black !font-semibold !py-3 !h-12 w-full'
                icon={<Save size={18} />}
              >
                Save Commission
              </Button>
            </div>
          </div>
        </div>*/}

        {/* Search & Filters */}
        <div className='flex flex-col sm:flex-row gap-4 items-end'>
          <Input
            placeholder='Search here...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            prefix={<Search size={16} className='text-gray-400' />}
            className='!bg-[#2a2a2a] !text-white !border !border-[#FCB806] !py-3'
          />
          {/*<Select
            defaultValue='this-month'
            className='w-40'
            suffixIcon={<Calendar size={16} className='text-gray-400' />}
            options={[
              { value: "this-month", label: "This Month" },
              { value: "last-month", label: "Last Month" },
              { value: "last-3-months", label: "Last 3 Months" },
            ]}
          />*/}
          <Button
            className='!bg-[#FCB806] !text-black !font-semibold !py-3 !h-12'
            onClick={handleExport}
          >
            <Download size={18} />
            Export
          </Button>
        </div>

        {/* Table */}
        <div className='rounded-lg overflow-hidden'>
          <DataTable
            columns={columns}
            data={closerList}
            pageSize={pageSize}
            total={meta?.total}
            currentPage={page}
            loading={isLoading}
            onPageChange={(newPage, newSize) => {
              setPage(newPage);
              setPageSize(newSize);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DealContainer;
