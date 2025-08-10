import { Tabs } from "antd";
import ClientDetails from "./ClientDetails";
import CloserDetails from "./CloserDetails";

const ClientDetailsContainer = ({ id }: { id: string }) => {
  const tabData = [
    {
      label: "Client Details",
      key: "1",
      children: <ClientDetails id={id} />,
    },
    {
      label: "Closer Details",
      key: "2",
      children: <CloserDetails clientId={id} />,
    },
  ];

  return <Tabs defaultActiveKey='1' centered items={tabData} />;
};

export default ClientDetailsContainer;
