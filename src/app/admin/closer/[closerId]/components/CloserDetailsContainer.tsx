import { Button, Tabs } from "antd";
import Performance from "./Performance";
import ProfileInformation from "./ProfileInformation";
import DealsHistory from "./DealsHistory";
import { PlusCircle } from "lucide-react";

const CloserDetailsContainer = ({ id }: { id: string }) => {
  const tabData = [
    {
      label: "Performance Overview",
      key: "1",
      children: <Performance id={id} />,
    },
    {
      label: "Profile Information",
      key: "2",
      children: <ProfileInformation id={id} />,
    },
    {
      label: "Deals History",
      key: "3",
      children: <DealsHistory id={id} />,
    },
  ];
  return (
    <div className='space-y-4'>
      <div className='flex justify-end '>
        <Button className='!border-none'>
          <PlusCircle size={16} /> Assign Client
        </Button>
      </div>
      <Tabs defaultActiveKey='1' centered items={tabData} />{" "}
    </div>
  );
};

export default CloserDetailsContainer;
