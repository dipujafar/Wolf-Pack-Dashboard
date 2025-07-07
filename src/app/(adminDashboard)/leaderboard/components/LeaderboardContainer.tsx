"use client";
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
import AddLeagueForm from "./AddLeagueForm";
import { Input } from "@/components/ui/input";

type TDataType = {
  key: number;
  name: string;
  commissionRate: string;
  status: string;
  date: string;
};

const LeaderboardContainer = () => {
  const [visible, setVisible] = useState(false);

  const [data] = useState<TDataType[]>(
    Array.from({ length: 30 }).map((_, index) => ({
      key: index,
      name: `Closer ${index + 1}`,
      commissionRate: "10%",
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
      render: (text) => <span className='text-white'>{text}</span>,
    },
    {
      title: "Commission Rate",
      dataIndex: "commissionRate",
      align: "center",
      render: (text) => <span className='text-white'>{text}</span>,
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
        <span className='ml-2'>Add League</span>
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
      <AddLeagueForm open={visible} setOpen={setVisible} />
    </div>
  );
};

export default LeaderboardContainer;
