import { Tabs } from "antd";

const tabData = [
  {
    label: "Client Details",
    key: "1",
    children: <p>fsdf</p>,
  },
  {
    label: "Closer Details",
    key: "2",
    children: <p>sdfsd</p>,
  }
];
const ClientDetailsContainer = () => {
  return <Tabs defaultActiveKey="1" centered items={tabData} />;
};

export default ClientDetailsContainer;
