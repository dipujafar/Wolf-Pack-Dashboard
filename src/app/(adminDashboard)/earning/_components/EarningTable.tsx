"use client";

import type React from "react";

import { Button, Input, Table, type TableProps, Select, Checkbox } from "antd";
import { Search, Save, Download, Calendar } from "lucide-react";
import { useState } from "react";

type TDataType = {
  key: number;
  serial: number;
  clientName: string;
  closerName: string;
  dealAmount: number;
  closerEarning: number;
  adminEarning: number;
  date: string;
};

const EarningTable = () => {
  const [data] = useState<TDataType[]>(
    Array.from({ length: 30 }).map((_, index) => ({
      key: index,
      serial: index + 1,
      clientName: "Techsavy Solution",
      closerName: "Ali Mahmud",
      dealAmount: 25000,
      closerEarning: 1000,
      adminEarning: 3000,
      date: "11 Feb, 2025",
    })),
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const pageSize = 6;

  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "Serial",
      dataIndex: "serial",
      align: "center",
      width: 80,
      render: (text) => <span className='text-white'>#{text}</span>,
    },
    {
      title: "Client Name",
      dataIndex: "clientName",
      align: "center",
      render: (text) => <span className='text-white'>{text}</span>,
    },
    {
      title: "Closer Name",
      dataIndex: "closerName",
      align: "center",
      render: (text) => <span className='text-white'>{text}</span>,
    },
    {
      title: "Deal Amount",
      dataIndex: "dealAmount",
      align: "center",
      render: (text) => <span className='text-white'>€{text.toLocaleString()}</span>,
    },
    {
      title: "Closer Earning (10%)",
      dataIndex: "closerEarning",
      align: "center",
      render: (text) => <span className='text-white'>€{text.toLocaleString()}</span>,
    },
    {
      title: "Admin Earning (20%)",
      dataIndex: "adminEarning",
      align: "center",
      render: (text) => <span className='text-white'>€{text.toLocaleString()}</span>,
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      align: "center",
      render: (text) => <span className='text-white'>{text}</span>,
    },
  ];

  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
    renderCell: () => <Checkbox className='custom-checkbox' />,
  };

  return (
    <div className=''>
      <div className='mx-auto space-y-6'>
        {/* Commission Rate Section */}
        <div className='space-y-4'>
          <h2 className='text-white text-xl font-semibold'>Set Commission Rate</h2>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='space-y-2'>
              <label className='text-gray-400 text-sm'>Closer Commission (%)</label>
              <Input
                placeholder='e.g. 10%'
                className='!bg-transparent !text-white !border !border-[#FCB806] !py-3 hover:!border-[#FCB806] focus:!border-[#FCB806]'
                style={{
                  backgroundColor: "transparent",
                  borderColor: "#FCB806",
                  color: "white",
                }}
              />
            </div>

            <div className='space-y-2'>
              <label className='text-gray-400 text-sm'>Admin Commission (%)</label>
              <Input
                placeholder='e.g. 20%'
                className='!bg-transparent !text-white !border !border-[#FCB806] !py-3 hover:!border-[#FCB806] focus:!border-[#FCB806]'
                style={{
                  backgroundColor: "transparent",
                  borderColor: "#FCB806",
                  color: "white",
                }}
              />
            </div>

            <div className='space-y-2'>
              <label className='text-gray-400 text-sm opacity-0'>Save</label>
              <Button
                className='!bg-[#FCB806] !text-black !font-semibold !py-3 !h-12 w-full !border-none hover:!bg-[#e6b014]'
                icon={<Save size={18} />}
              >
                Save Commission
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className='flex flex-col sm:flex-row gap-4 items-end'>
          <div className='flex-1 space-y-2'>
            <Input
              placeholder='Search here...'
              prefix={<Search size={16} className='text-gray-400' />}
              className='!bg-[#2a2a2a] !text-white !border !border-[#FCB806] !py-3 hover:!border-[#FCB806] focus:!border-[#FCB806]'
              style={{
                backgroundColor: "#2a2a2a",
                borderColor: "#FCB806",
                color: "white",
              }}
            />
          </div>

          <div className='space-y-2'>
            <Select
              defaultValue='This Month'
              className='w-40'
              suffixIcon={<Calendar size={16} className='text-gray-400' />}
              style={{ height: "48px" }}
              dropdownStyle={{ backgroundColor: "#2a2a2a", border: "1px solid #FCB806" }}
              options={[
                { value: "this-month", label: "This Month" },
                { value: "last-month", label: "Last Month" },
                { value: "last-3-months", label: "Last 3 Months" },
              ]}
            />
          </div>

          <Button
            className='!bg-[#FCB806] !text-black !font-semibold !py-3 !h-12 !border-none hover:!bg-[#e6b014]'
            icon={<Download size={18} />}
          >
            Export
          </Button>
        </div>

        {/* Table */}
        <div className='rounded-lg overflow-hidden'>
          <Table
            columns={columns}
            dataSource={paginatedData}
            pagination={false}
            rowKey='key'
            rowSelection={rowSelection}
            className='custom-table'
            style={{
              backgroundColor: "#2a2a2a",
            }}
          />
        </div>

        {/* Custom Pagination */}
        <div className='flex justify-center mt-6'>
          <div className='flex gap-2'>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-[#FCB806] text-black"
                    : "bg-gray-600 text-white hover:bg-gray-500"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-table .ant-table {
          background-color: #2a2a2a !important;
          border: 1px solid #fcb806;
        }

        .custom-table .ant-table-thead > tr > th {
          background-color: #fcb806 !important;
          color: black !important;
          font-weight: 600 !important;
          border-bottom: 1px solid #fcb806 !important;
          text-align: center !important;
        }

        .custom-table .ant-table-tbody > tr > td {
          background-color: #2a2a2a !important;
          border-bottom: 1px solid #404040 !important;
          color: white !important;
        }

        .custom-table .ant-table-tbody > tr:hover > td {
          background-color: #3a3a3a !important;
        }

        .custom-checkbox .ant-checkbox-inner {
          background-color: transparent !important;
          border-color: #fcb806 !important;
        }

        .custom-checkbox .ant-checkbox-checked .ant-checkbox-inner {
          background-color: #fcb806 !important;
          border-color: #fcb806 !important;
        }

        .ant-select-selector {
          background-color: #2a2a2a !important;
          border-color: #fcb806 !important;
          color: white !important;
          height: 48px !important;
        }

        .ant-select-selection-item {
          color: white !important;
          line-height: 46px !important;
        }

        .ant-input::placeholder {
          color: #666 !important;
        }

        .ant-input-affix-wrapper {
          background-color: transparent !important;
        }

        .ant-input-affix-wrapper .ant-input {
          background-color: transparent !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
};

export default EarningTable;
