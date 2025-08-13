"use client";

import { useState } from "react";
import { Button, Image, Input, message, Popconfirm, TableProps } from "antd";
import { ArrowDownNarrowWide, Delete, DeleteIcon, Eye, PlusCircle, Search, Trash2 } from "lucide-react";
import { CgUnblock } from "react-icons/cg";
import Link from "next/link";

import AddCloserForm from "./AddClientForm";
import DataTable from "@/utils/DataTable";
import { useGetAllClientsQuery } from "@/redux/api/clientApi";
import { useDebounced } from "@/redux/hooks";
import { TClient, TResponse } from "@/types";

const ClientsTable = () => {
  const [addCloserModal, setAddCloserModal] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  // Debounced search term
  const searchTerm = useDebounced({ value: search, delay: 500 });

  // API query
  const { data, isLoading } = useGetAllClientsQuery([
    { label: "page", value: page.toString() },
    { label: "limit", value: pageSize.toString() },
    { label: "searchTerm", value: typeof searchTerm === "string" ? searchTerm : "" },
  ]);

  const clientData = data?.data as TResponse<TClient[]>;
  const meta = clientData?.meta;

  const handleBlockUser = (id: string) => {
    // TODO: Implement block API call here
    console.log(`Blocking user with ID: ${id}`);
    message.success("Blocked the user");
  };

  const columns: TableProps<TClient>["columns"] = [
    {
      title: "Serial",
      dataIndex: "id",
      align: "center",
      render: (_, __, index) => <span>#{(page - 1) * pageSize + index + 1}</span>,
    },
    {
      title: "Client Name",
      dataIndex: "name",
      align: "center",
      render: (text) => (
        <div className='flex items-center justify-center gap-x-2'>
          {/*<Image
            src={"/user_image1.png"}
            alt='profile-picture'
            width={40}
            height={40}
            className='rounded-full'
          />*/}
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Offer",
      dataIndex: "offer",
      align: "center",
    },
    {
      title: "Target Audience",
      dataIndex: "targetAudience",
      align: "center",
    },
    {
      title: "Revenue Target",
      dataIndex: "revenueTarget",
      align: "center",
      render: (value) => `$${value.toLocaleString()}`,
    },
    {
      title: "Commission Rate",
      dataIndex: "commissionRate",
      align: "center",
      render: (value) => `${value}%`,
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      filters: [
        { text: "New", value: "NEW" },
        { text: "Open", value: "OPEN" },
        { text: "Closed", value: "CLOSED" },
      ],
      filterIcon: () => <ArrowDownNarrowWide color='#fff' />,
      //filterMode: "tree",
      //filterSearch: true,
      onFilter: (value, record) => record?.closer?.status.indexOf(value as string) === 0,
      render: (status, record) => {
        return <span className='capitalize'>{record?.closer?.status}</span>;
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      align: "center",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (_, record) => (
        <div className='flex justify-center gap-3'>
          <Link href={`/admin/client/${record?.id}`}>
            <Eye size={20} color='#78C0A8' />
          </Link>
          <Popconfirm
            title='Delete Client'
            description='Are you sure you want to delete this client?'
            onConfirm={() => handleBlockUser(record.id)}
            okText='Yes'
            cancelText='No'
          >
            <Trash2 size={20} className="text-red-500" />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className='rounded-md'>
      {/* Add Client Button */}
      <Button
        onClick={() => setAddCloserModal(true)}
        className='w-full !border-none !h-[45px] !text-lg'
      >
        <PlusCircle /> Add Client
      </Button>

      {/* Search and Export */}
      <div className='flex justify-between items-center px-3 py-5'>
        <Input
          className='lg:!w-[250px] !py-2 placeholder:!text-white !bg-transparent !text-white !border-[#f4dede]'
          placeholder='Search here...'
          prefix={<Search size={16} color='#fff' />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button className='!border-none !h-[40px] !text-base lg:min-w-[250px] !bg-[#fcb80617]'>
          <PlusCircle size={20} /> Export
        </Button>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={clientData?.data || []}
        pageSize={pageSize}
        total={meta?.total}
        currentPage={page}
        loading={isLoading}
        onPageChange={(newPage, newSize) => {
          setPage(newPage);
          setPageSize(newSize);
        }}
      />

      {/* Add Client Form */}
      <AddCloserForm open={addCloserModal} setOpen={setAddCloserModal} />
    </div>
  );
};

export default ClientsTable;
