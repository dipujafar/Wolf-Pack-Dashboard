import React from "react";
import CloserDetailsContainer from "./components/CloserDetailsContainer";

const CloserDetails = ({ params }: { params: { closerId: string } }) => {
  return (
    <div>
      <CloserDetailsContainer id={params.closerId} />
    </div>
  );
};

export default CloserDetails;
