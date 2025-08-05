import { Tabs } from "antd";
import ClientDetails from "./ClientDetails";
import CloserDetails from "./CloserDetails";

const tabData = [
  {
    label: "Client Details",
    key: "1",
    children: <ClientDetails />,
  },
  {
    label: "Closer Details",
    key: "2",
    children: <CloserDetails />,
  },
];
const ClientDetailsContainer = () => {
  return <Tabs defaultActiveKey='1' centered items={tabData} />;
};

export default ClientDetailsContainer;
