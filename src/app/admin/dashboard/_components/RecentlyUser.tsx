"use client";
import { Image, message, Popconfirm, PopconfirmProps, TableProps } from "antd";

import { useState } from "react";
import DataTable from "@/utils/DataTable";
import { CgUnblock } from "react-icons/cg";
import { ArrowDownNarrowWide, Eye } from "lucide-react";
import UserDetails from "@/components/(adminDashboard)/user/UserDetails";
import { useAllUserQuery, useUpdateUserStatusMutation } from "@/redux/api/userApi";
import { TUser } from "@/types";
import moment from "moment";
import { Error_Modal, Success_model } from "@/lib/utils";

const RecentlyUser = () => {
  const [open, setOpen] = useState<TUser | null>(null);

  const [updateUser, { isLoading: isUpdateLoading }] = useUpdateUserStatusMutation();
  const { data: users, isLoading } = useAllUserQuery([{ label: "limit", value: "10" }]);

  const usersData = (users?.data as TUser[]) || [];

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
            className='size-10'
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
          <Eye
            size={22}
            color='#78C0A8'
            onClick={() => setOpen(record)}
            className='cursor-pointer'
          />
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
    <div className='rounded-2xl'>
      <DataTable columns={columns} data={usersData}></DataTable>
      <UserDetails open={open} setOpen={setOpen}></UserDetails>
    </div>
  );
};

export default RecentlyUser;
