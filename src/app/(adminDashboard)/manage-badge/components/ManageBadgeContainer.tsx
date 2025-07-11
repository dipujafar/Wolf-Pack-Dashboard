"use client";

import image from "@/assets/image/adminProfile.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableProps } from "antd";
import { Plus, Trash2 } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import AddBadgeForm from "./AddBadgeForm";

type TDataType = {
  key: number;
  name: string;
  image: string | StaticImageData;
  status: string;
  serial: number;
  description?: string;
  date: string;
};

const ManageBadgeContainer = () => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<Array<string>>([]);

  const [data, setData] = useState<TDataType[]>(
    Array.from({ length: 30 }).map((_, index) => ({
      key: index,
      name: `Closer ${index + 1}`,
      image: image,
      status: "Active",
      serial: index + 1,
      description: `Badge for closer ${index + 1}`,
      date: "11 Feb, 2025",
    })),
  );

  const handleDelete = (key: number) => {
    setData((prev) => prev.filter((item) => item.key !== key));
  };

  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "Serial",
      dataIndex: "serial",
      align: "center",
      width: 80,
      render: (serial) => <span className='text-white'>#{serial}</span>,
    },
    {
      title: "League Name",
      dataIndex: "name",
      align: "center",
      render: (_, record) => (
        <div className='flex items-center justify-center gap-x-3'>
          <Image src={record.image} alt='badge' width={40} height={40} className='rounded-full' />
          <p className='text-white'>{record.name}</p>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        { text: "Active", value: "Active" },
        { text: "Inactive", value: "Inactive" },
      ],
      onFilter: (value, record) => record.status === value,
      align: "center",
      render: (status) => <span className='text-white'>{status}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      align: "center",
      render: (description) => <span className='text-white'>{description}</span>,
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      align: "center",
      render: (date) => <span className='text-white'>{date}</span>,
    },

    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (_, record) => (
        <Button
          size='icon'
          className='text-white bg-red-600 hover:bg-red-500'
          onClick={() => handleDelete(record.key)}
        >
          <Trash2 className='size-4' />
        </Button>
      ),
    },
  ];

  return (
    <div className='space-y-6'>
      {/* Add Button */}
      <Button onClick={() => setVisible(true)} className='bg-[#FCB806] w-full' size='lg'>
        <Plus className='size-4 text-white' />
        <span className='ml-2'>Add Badge</span>
      </Button>

      {/* Search and Filter */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-end'>
        <Input
          placeholder='Search here...'
          className='flex-1 !bg-gray-800  !text-white !border !border-[#FCB806] py-5'
        />
        <Select defaultValue='1' onValueChange={(value) => console.log(value)}>
          <SelectTrigger className='bg-gray-800 text-white border-[#FCB806] py-5'>
            <SelectValue placeholder='Select Month' />
          </SelectTrigger>
          <SelectContent className='bg-gray-800 border-gray-700'>
            {[{ id: "1", name: "January" }].map((month) => (
              <SelectItem key={month.id} value={month.id} className='text-white hover:bg-gray-700'>
                {month.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className='rounded-lg overflow-hidden'>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
            hideOnSinglePage: true,
          }}
          rowKey='key'
          className='custom-table'
          style={{ backgroundColor: "#1f2937" }}
          rowSelection={{
            onChange: (selectedRowKeys, selectedRows) => {
              setSelected(selectedRows.map((row) => row.serial.toString()));
            },
            getCheckboxProps: (record) => {
              return {
                disabled: record.serial === 1,
              };
            },
          }}
        />
      </div>

      {/* Add Badge Modal */}
      <AddBadgeForm open={visible} setOpen={setVisible} />
    </div>
  );
};

export default ManageBadgeContainer;
