"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popconfirm, Table, TableProps } from "antd";
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import AddBadgeForm from "./AddBadgeForm";
import { useGetAllBadgesQuery, useDeleteBadgeMutation } from "@/redux/api/badgeApi";
import { TBadge } from "@/types";
import { useDebounced } from "@/redux/hooks";

export default function ManageBadgeContainer() {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");
  const searchTerm = useDebounced({ value: search, delay: 300 });
  const { data, isLoading } = useGetAllBadgesQuery([
    {
      label: "searchTerm",
      value: searchTerm.toString(),
    },
  ]);
  const badges = (data?.data as TBadge[]) || [];

  const [deleteBadge, { isLoading: isDeleting }] = useDeleteBadgeMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteBadge(id).unwrap();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const columns: TableProps<TBadge>["columns"] = [
    {
      title: "Serial",
      align: "center",
      render: (_, __, index) => <span className='text-white'>#{index + 1}</span>,
    },
    {
      title: "Name & Icon",
      dataIndex: "name",
      align: "center",
      render: (_, record) => (
        <div className='flex items-center justify-center gap-x-3'>
          <Image
            src={record.icon}
            alt={record.name}
            width={40}
            height={40}
            className='rounded-full object-cover'
          />
          <p className='text-white'>{record.name}</p>
        </div>
      ),
    },
    {
      title: "Deal Count",
      dataIndex: "dealCount",
      align: "center",
      render: (dealCount) => <span className='text-white'>{dealCount}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      align: "center",
      render: (description) => <span className='text-white'>{description}</span>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      align: "center",
      render: (date) => <span className='text-white'>{new Date(date).toLocaleString()}</span>,
    },
    {
      title: "Action",
      align: "center",
      render: (_, record) => (
        <Popconfirm
          title='Delete'
          description={`Are you sure to delete?`}
          onConfirm={() => handleDelete(record.id)}
          okText='Yes'
          cancelText='No'
        >
          <Button
            size='icon'
            className='text-white bg-red-600 hover:bg-red-500'
            disabled={isDeleting}
          >
            <Trash2 className='size-4' />
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className='space-y-6'>
      <Button
        onClick={() => setVisible(true)}
        className='bg-[#FCB806] hover:bg-[#FCB806]/90 w-full'
        size='lg'
      >
        <Plus className='size-4 text-white' />
        <span className='ml-2'>Add Badge</span>
      </Button>

      <Input
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search here...'
        className='!bg-gray-800 !text-white !border !border-[#FCB806] py-5'
      />

      <div className='rounded-lg overflow-hidden'>
        <Table
          columns={columns}
          dataSource={badges}
          loading={isLoading}
          rowKey='id'
          pagination={{ pageSize: 10, showSizeChanger: false, hideOnSinglePage: true }}
          className='custom-table'
          style={{ backgroundColor: "#1f2937" }}
        />
      </div>

      <AddBadgeForm open={visible} setOpen={setVisible} />
    </div>
  );
}
