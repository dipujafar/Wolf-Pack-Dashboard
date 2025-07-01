import { Tabs } from "antd";
import SalesOverviewContainer from "./components/SalesOverview/SalesOverviewContainer";

const tabData = [
  {
    label: "Sales Overview",
    key: "1",
    children: <SalesOverviewContainer />,
  },
  {
    label: "Top Closer",
    key: "2",
    children: <p>dd</p>,
  },
];

const TracksSalesPage = () => {
  return <Tabs defaultActiveKey="1" centered items={tabData} />;
};

export default TracksSalesPage;
