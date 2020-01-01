import React, { FC, Suspense } from "react";
import Poll from "components/Poll";
import PollType from "types/Poll";
import fetchData from "./polls";

const resource = fetchData();

const PollsContainer: FC = () => {
  const {
    data: { polls, links }
  } = resource.polls.read();

  console.log(polls, links);
  return (
    <div className="flex mb-4 w-screen">
      {polls.map((poll: PollType) => (
        <Poll key={poll._id} poll={poll} />
      ))}
    </div>
  );
};

export default PollsContainer;
