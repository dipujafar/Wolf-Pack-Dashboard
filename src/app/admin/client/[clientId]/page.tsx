import React from "react";
import ClientDetailsContainer from "./components/ClientDetailsContainer";

const ClientId = ({ params }: { params: { clientId: string } }) => {
  return (
    <>
      <ClientDetailsContainer id={params.clientId} />
    </>
  );
};

export default ClientId;
