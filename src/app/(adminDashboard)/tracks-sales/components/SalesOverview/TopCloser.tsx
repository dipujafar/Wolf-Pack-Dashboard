"use client";
import { Table, Pagination } from "antd";
import type { TableProps } from "antd";
import { useState } from "react";

type TDataType = {
  id: string;
  serial: number;
  name: string;
  leagues: string;
  revenue: string;
  deals: string;
  commission: string;
};

const TopCloser = () => {
  // Sample mock data
  const [data, setData] = useState<TDataType[]>(
    Array.from({ length: 50 }).map((_, index) => ({
      id: `${index + 1}`,
      serial: index + 1,
      name: `Closer ${index + 1}`,
      leagues: index % 2 === 0 ? "Premier League" : "Championship",
      revenue: `$${(Math.random() * 10000 + 5000).toFixed(2)}`,
      deals: `${Math.floor(Math.random() * 50) + 1}`,
      commission: `$${(Math.random() * 2000 + 500).toFixed(2)}`,
    })),
  );

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
      width: 80,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 180,
    },
    {
      title: "Leagues",
      dataIndex: "leagues",
      key: "leagues",
      width: 180,
      filters: [
        {
          text: "Premier League",
          value: "Premier League",
        },
        {
          text: "Championship",
          value: "Championship",
        },
      ],
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
      width: 150,
    },
    {
      title: "Deals",
      dataIndex: "deals",
      key: "deals",
      width: 100,
    },
    {
      title: "Commission",
      dataIndex: "commission",
      key: "commission",
      width: 150,
    },
  ];

  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div>
      <h1 className='text-2xl font-semibold mb-6 text-white'>Top Closers</h1>
      <Table
        columns={columns}
        dataSource={paginatedData}
        pagination={false}
        rowKey='id'
        bordered
        className='rounded-lg overflow-hidden'
      />
      <div className='flex justify-end mt-4'>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={data.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default TopCloser;
