import { Tabs } from "antd";
import PrizeForm from "./PrizeForm";
import PrizeWinner from "./PrizeWinner";

const PrizeContainer = () => {
  const tabData = [
    {
      label: "Prizes",
      key: "1",
      children: <PrizeForm />,
    },
    {
      label: "Prize Winners",
      key: "2",
      children: <PrizeWinner />,
    },
  ];
  return <Tabs defaultActiveKey='1' centered items={tabData} />;
};

export default PrizeContainer;
