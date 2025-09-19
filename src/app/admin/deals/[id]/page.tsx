import DealDetailsContainer from "./components/DealDetailsContainer";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  return <DealDetailsContainer id={id} />;
};

export default page;
