"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popconfirm, Table, TableProps } from "antd";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import AddLeagueForm from "./AddLeagueForm";
import { useGetLeaguesQuery, useDeleteLeagueMutation } from "@/redux/api/leagueApi"; // Adjust path to your actual API slice
//import { TLeague } from "@/types";
import { Error_Modal, Success_model } from "@/lib/utils";
import { useDebounced } from "@/redux/hooks";

const LeaderboardContainer = () => {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState<string>("");
  const searchTerm = useDebounced({ value: search, delay: 300 });
  // ✅ Fetch leagues list
  const { data, isLoading } = useGetLeaguesQuery([
    {
      label: "searchTerm",
      value: searchTerm.toString(),
    },
  ]);
  //const leagues = (data?.data as TLeague[]) || [];

  // ✅ Delete mutation
  const [deleteLeague, { isLoading: isDeleting }] = useDeleteLeagueMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteLeague(id).unwrap();
      Success_model({ title: "League deleted successfully!!" });
    } catch (error: any) {
      console.error("Delete failed:", error);
      Error_Modal({ title: error?.data?.message });
    }
  };

  //const columns: TableProps<TLeague>["columns"] = [
  //  {
  //    title: "Serial",
  //    dataIndex: "id", // not actually used for render
  //    align: "center",
  //    width: 80,
  //    render: (_, __, index) => <span className='text-white'>#{index + 1}</span>,
  //  },
  //  {
  //    title: "League Name",
  //    dataIndex: "name",
  //    align: "center",
  //    render: (text: string) => <span className='text-white'>{text}</span>,
  //  },
  //  {
  //    title: "Deal Amount",
  //    dataIndex: "dealAmount",
  //    align: "center",
  //    render: (amount: number) => <span className='text-white'>€{amount ? `${amount}` : "-"}</span>,
  //  },
  //  {
  //    title: "Description",
  //    dataIndex: "description",
  //    align: "center",
  //    render: (description: string) => (
  //      <span className='text-white'>{description ? `${description}` : "-"}</span>
  //    ),
  //  },
  //  {
  //    title: "Date & Time",
  //    dataIndex: "createdAt", // use actual date field
  //    align: "center",
  //    render: (date: string) => (
  //      <span className='text-white'>
  //        {new Date(date).toLocaleString("en-GB", {
  //          day: "2-digit",
  //          month: "short",
  //          year: "numeric",
  //          hour: "2-digit",
  //          minute: "2-digit",
  //        })}
  //      </span>
  //    ),
  //  },
  //  {
  //    title: "Action",
  //    dataIndex: "id",
  //    align: "center",
  //    render: (_: string, record: TLeague) => (
  //      <Popconfirm
  //        title='Delete'
  //        description={`Are you sure to delete?`}
  //        onConfirm={() => handleDelete(record.id)}
  //        okText='Yes'
  //        cancelText='No'
  //      >
  //        <Button
  //          size='icon'
  //          className='text-white bg-red-600 hover:bg-red-500'
  //          disabled={isDeleting}
  //        >
  //          <Trash2 className='size-4' />
  //        </Button>
  //      </Popconfirm>
  //    ),
  //  },
  //];

  return (
    <div className='space-y-4'>
      {/* Add League Button */}
      <Button
        onClick={() => setVisible((pre) => !pre)}
        className='bg-[#FCB806] hover:bg-[#FCB806]/90 w-full'
        size={"lg"}
      >
        <Plus className='size-4 text-white' />
        <span className='ml-2'>Add League</span>
      </Button>

      {/* Search Bar */}
      <div className='flex flex-col sm:flex-row gap-4 items-end'>
        <div className='flex-1 space-y-2'>
          <Input
            placeholder='Search here...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='!bg-gray-800 !text-white !border !border-[#FCB806]  hover:!border-[#FCB806] focus:!border-[#FCB806] py-5'
          />
        </div>
      </div>

      {/* Table */}
      <div className='rounded-lg overflow-hidden'>
        {/*<Table
          columns={columns}
          dataSource={leagues}
          loading={isLoading}
          pagination={{ pageSize: 10, showSizeChanger: false, hideOnSinglePage: true }}
          rowKey='key'
          className='custom-table'
          style={{ backgroundColor: "#1f2937" }}
        />*/}
      </div>

      {/* Add League Modal */}
      <AddLeagueForm open={visible} setOpen={setVisible} />
    </div>
  );
};

export default LeaderboardContainer;
