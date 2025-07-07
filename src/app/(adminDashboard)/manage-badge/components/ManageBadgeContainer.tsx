"use client";
import image from "@/assets/image/adminProfile.png";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableProps } from "antd";
import { Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import AddBadgeForm from "./AddBadgeForm";
import Image, { StaticImageData } from "next/image";

type TDataType = {
  key: number;
  name: string;
  image: string | StaticImageData;
  status: string;
  date: string;
};

const ManageBadgeContainer = () => {
  const [visible, setVisible] = useState(false);

  const [data] = useState<TDataType[]>(
    Array.from({ length: 30 }).map((_, index) => ({
      key: index,
      name: `Closer ${index + 1}`,
      image: image,
      status: "Active",
      date: "11 Feb, 2025",
    })),
  );

  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "Serial",
      dataIndex: "serial",
      align: "center",
      width: 80,
      render: (text) => <span className='text-white'>#{text}</span>,
    },
    {
      title: "League Name",
      dataIndex: "name",
      align: "center",
      render: (text, record) => (
        <div className='flex items-center justify-center gap-x-3'>
          <Image
            src={record.image}
            alt='profile-picture'
            width={40}
            height={40}
            className='size-10'
          ></Image>
          <p className='text-white'>{record.name}</p>
        </div>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      filters: [
        {
          text: "Active",
          value: "Active",
        },
        {
          text: "Inactive",
          value: "Inactive",
        },
      ],
      align: "center",
      render: (text) => <span className='text-white'>{text.toLocaleString()}</span>,
    },

    {
      title: "Date & Time",
      dataIndex: "date",
      align: "center",
      render: (text) => <span className='text-white'>{text}</span>,
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (text) => (
        <div>
          {/*<p className='text-white'>Edit</p>*/}
          <Button size={"icon"} className='text-white bg-red-600 hover:bg-red-500'>
            <Trash2 className='size-4' />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className='space-y-4'>
      {/* Search and Filter Section */}
      <Button onClick={() => setVisible((pre) => !pre)} className='bg-[#FCB806] w-full' size={"lg"}>
        <Plus className='size-4 text-white' />
        <span className='ml-2'>Add Badge</span>
      </Button>
      <div className='flex flex-col sm:flex-row gap-4 items-end'>
        <div className='flex-1 space-y-2'>
          <Input
            placeholder='Search here...'
            className='!bg-gray-800 !text-white !border !border-[#FCB806]  hover:!border-[#FCB806] focus:!border-[#FCB806] py-5'
          />
        </div>
        <div className='flex-1 space-y-2 '>
          <Select onValueChange={(value) => console.log(value)} defaultValue={"1"}>
            <SelectTrigger className='bg-gray-800  text-white focus:border-yellow-500 py-5 border-[#FCB806]'>
              <SelectValue placeholder='Select Client to assign' />
            </SelectTrigger>
            <SelectContent className='bg-gray-800 border-gray-700'>
              {[{ id: "1", name: "January" }].map((client) => (
                <SelectItem
                  key={client.id}
                  value={client.id}
                  className='text-white hover:bg-gray-700 focus:bg-gray-700'
                >
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className='rounded-lg overflow-hidden'>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10, showSizeChanger: false, hideOnSinglePage: true }}
          rowKey='key'
          //rowSelection={rowSelection}
          className='custom-table'
          style={{
            backgroundColor: "#1f2937",
          }}
        />
      </div>
      <AddBadgeForm open={visible} setOpen={setVisible} />
    </div>
  );
};

export default ManageBadgeContainer;
