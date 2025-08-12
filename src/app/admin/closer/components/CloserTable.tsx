"use client";

import { Button, Input, message, Popconfirm, PopconfirmProps, TableProps, Tag } from "antd";
import { useState, useMemo } from "react";
import DataTable from "@/utils/DataTable";
import { CgUnblock } from "react-icons/cg";
import { ArrowDownNarrowWide, Eye, PlusCircle, Search } from "lucide-react";
import AddCloserForm from "./AddCloserForm";
import Link from "next/link";
import { useGetAllClosersQuery } from "@/redux/api/closerApi";
import { TCloser, TUser } from "@/types";
import dayjs from "dayjs";
import { useDebounced } from "@/redux/hooks";
import { useAllUserQuery, useUpdateUserStatusMutation } from "@/redux/api/userApi";
import Image from "next/image";
import moment from "moment";
import { Error_Modal, Success_model } from "@/lib/utils";

const CloserTable = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(11);
  const [search, setSearch] = useState("");

  const searchTerm = useDebounced({ value: search, delay: 300 });

  const [updateUser, { isLoading: isUpdateLoading }] = useUpdateUserStatusMutation();

  // Pass pagination params to the query
  const { data: cData, isLoading } = useAllUserQuery([
    {
      label: "page",
      value: page.toString(),
    },
    {
      label: "limit",
      value: pageSize.toString(),
    },
    {
      label: "searchTerm",
      value: typeof searchTerm === "string" ? searchTerm : searchTerm.toString(),
    },
  ]);

  const closerData = (cData?.data || []) as TUser[];
  const totalItems = cData?.meta?.total || closerData.length; // If backend returns total

  const confirmBlock = async (user: TUser) => {
    try {
      const res = await updateUser({
        id: user.id,
        data: {
          isActive: !user.isActive,
        },
      }).unwrap();
      Success_model({ title: res?.message });
    } catch (err: any) {
      Error_Modal({ title: err?.data?.message });
    }
  };

  const columns: TableProps<TUser>["columns"] = [
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
        <div className='flex  justify-center items-center gap-x-1'>
          <Image
            src={record.profilePicture}
            alt='profile-picture'
            width={40}
            height={40}
            className='size-10 object-cover rounded-full'
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
      title: " Date",
      dataIndex: "createdAt",
      align: "center",
      render: (text) => <p>{moment(text).format("LL")}</p>,
    },

    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (text, record) => (
        <div className='flex justify-center gap-2'>
          <Link href={`/admin/closer/${record.id}`}>
            <Eye size={22} color='#78C0A8' className='cursor-pointer' />
          </Link>
          <Popconfirm
            title='Block the user'
            description={`Are you sure to ${record?.isActive ? "block" : "unblock"} this user?`}
            onConfirm={() => confirmBlock(record)}
            okText='Yes'
            cancelText='No'
          >
            <CgUnblock
              size={22}
              color={record.isActive ? "red" : "green"}
              className='cursor-pointer'
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className='rounded-md'>
      <div className='flex justify-between items-center px-3 py-5 gap-3 sm:gap-5'>
        <Input
          className='lg:w-full !py-2 placeholder:!text-white !bg-transparent !text-white !border-[#f4dede]'
          placeholder='Search here...'
          prefix={<Search size={16} color='#fff' />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className='flex gap-2'>
          {/*<Button
            className='!border-none !h-[40px] !text-base !bg-[#78C0A8] !text-white'
            onClick={() => setAddCloserModal(true)}
          >
            <PlusCircle size={18} /> Add Closer
          </Button>*/}
          <Button className='!border-none !h-[40px] !text-base !bg-[#fcb80617]'>
            <PlusCircle size={18} /> Export
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={closerData}
        pageSize={pageSize}
        total={totalItems}
        currentPage={page}
        loading={isLoading}
        onPageChange={(newPage, newSize) => {
          setPage(newPage);
          setPageSize(newSize);
        }}
      />

      {/*<AddCloserForm open={addCloserModal} setOpen={setAddCloserModal} />*/}
    </div>
  );
};

export default CloserTable;
