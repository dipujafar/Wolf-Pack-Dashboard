import React from "react";
import DealsHistoryDetailsContainer from "./components/DealsHistoryDetailsContainer";

const DealsHistoryDetails = async ({
  params,
}: {
  params: { closerId: string; dealsHistoryId: string };
}) => {
  return (
    <div>
      <DealsHistoryDetailsContainer closerId={params.closerId} />
    </div>
  );
};

export default DealsHistoryDetails;
