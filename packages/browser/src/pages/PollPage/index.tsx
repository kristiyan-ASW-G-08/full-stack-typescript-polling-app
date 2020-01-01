import React, { FC } from "react";
import { useParams } from "react-router-dom";

const PollPage: FC = () => {
  const { pollId } = useParams();
  console.log(pollId);
  return (
    <section
      style={{ height: "90vh" }}
      className="flex items-center flex-col  justify-center w-screen"
    />
  );
};

export default PollPage;
