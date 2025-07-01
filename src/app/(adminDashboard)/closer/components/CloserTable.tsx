"use client";
import {
  Button,
  Image,
  Input,
  message,
  Popconfirm,
  PopconfirmProps,
  TableProps,
} from "antd";
import { useState } from "react";
import DataTable from "@/utils/DataTable";
import { CgUnblock } from "react-icons/cg";
import { ArrowDownNarrowWide, Eye, PlusCircle, Search } from "lucide-react";;
import AddCloserForm from "./AddCloserForm";
import Link from "next/link";

type TDataType = {
  key?: number;
  serial: number;
  name: string;
  email: string;
  date: string;
  status: string;
};
const data: TDataType[] = Array.from({ length: 18 }).map((data, inx) => ({
  key: inx,
  serial: inx + 1,
  name: "Muskan Tanaz",
  email: "muskantanaz@gmail.com",
  date: "19 Jun 2025",
  status: "Active",
}));

const confirmBlock: PopconfirmProps["onConfirm"] = (e) => {
  console.log(e);
  message.success("Blocked the user");
};

const CloserTable = () => {
  const [addCloserModal, setAddCloserModal] = useState(false);

  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "Serial",
      dataIndex: "serial",
      align: "center",
      render: (text) => <p>#{text}</p>,
    },
    {
      title: "User Name",
      dataIndex: "name",
      align: "center",
      render: (text, record) => (
        <div className="flex items-center justify-center gap-x-1">
          <Image
            src={"/user_image1.png"}
            alt="profile-picture"
            width={40}
            height={40}
            className="size-10"
          ></Image>
          <p>{text}</p>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
    },

    {
      title: "Status",
      dataIndex: "status",
      align: "center",
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
      filterIcon: () => <ArrowDownNarrowWide color="#fff" />,
      onFilter: (value, record) => record.status.indexOf(value as string) === 0,
    },

    {
      title: "Date",
      dataIndex: "date",
      align: "center",
    },

    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (data, record) => (
        <div className="flex justify-center gap-2">
         <Link href={`/closer/${record.serial}`}> <Eye size={22} color="#78C0A8"  /></Link>
          <Popconfirm
            title="Block the user"
            description="Are you sure to block this user?"
            onConfirm={confirmBlock}
            okText="Yes"
            cancelText="No"
          >
            <CgUnblock size={22} color="#CD0335" />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="rounded-md">
      <Button onClick={() => setAddCloserModal(true)} className="w-full !border-none !h-[45px] !text-lg">
        <PlusCircle /> Add Closer
      </Button>
      <div className="flex justify-between items-center px-3 py-5">
        <Input
          className=" lg:!w-[250px] !py-2 placeholder:!text-white  !bg-transparent !text-white !border-[#f4dede]"
          placeholder="Search here..."
          prefix={<Search size={16} color="#fff"></Search>}
        ></Input>
        <Button className="!border-none !h-[40px] !text-base lg:min-w-[250px] !bg-[#fcb80617]">
          <PlusCircle size={20} /> Export
        </Button>
      </div>
      <DataTable columns={columns} data={data} pageSize={11}></DataTable>
      <AddCloserForm open={addCloserModal} setOpen={setAddCloserModal} />
    </div>
  );
};

export default CloserTable;
