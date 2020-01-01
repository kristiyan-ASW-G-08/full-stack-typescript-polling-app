import React, { FC } from "react";
import PollType from "types/Poll";

const Poll: FC<{ poll: PollType }> = ({ poll: { name, description } }) => {
  return (
    <div className=" flex-1 max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
    </div>
  );
};

export default Poll;
