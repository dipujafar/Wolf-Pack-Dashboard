import { Table } from "antd";
import { TableProps } from "antd/lib/table";

interface DataTableProps<T> {
  columns: TableProps<T>["columns"];
  data: T[];
  pageSize?: number;
  total?: number;
  currentPage?: number;
  loading?: boolean;
  onPageChange?: (page: number, pageSize: number) => void;
}

const DataTable = <T extends object>({
  columns,
  data,
  pageSize = 10,
  total,
  currentPage,
  loading = false,
  onPageChange,
}: DataTableProps<T>) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey={(record) => (record as any).id || Math.random()} // prevent key warnings
      pagination={{
        position: ["bottomCenter"],
        pageSize,
        total,
        current: currentPage,
        showSizeChanger: true,
        showTotal: (total) => `Total ${total} items`,
        onChange: (page, size) => {
          if (onPageChange) onPageChange(page, size);
        },
      }}
      scroll={{ x: "max-content" }}
    />
  );
};

export default DataTable;
