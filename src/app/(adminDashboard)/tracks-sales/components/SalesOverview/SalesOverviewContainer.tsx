import { SalesOverviewChart } from "./SalesOverviewChart";
import SalesOverviewStat from "./SalesOverviewStat";

const SalesOverviewContainer = () => {
  return (
    <div className="space-y-5">
      <SalesOverviewStat />
      <SalesOverviewChart />
    </div>
  );
};

export default SalesOverviewContainer;
