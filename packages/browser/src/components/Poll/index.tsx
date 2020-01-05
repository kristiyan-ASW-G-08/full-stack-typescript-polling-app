import React, { FC } from "react";
import { Link } from "react-router-dom";
import PollType from "types/Poll";

interface PollProps {
  poll: PollType;
}
const Poll: FC<PollProps> = ({ poll: { name, description, _id } }) => (
  <Link
    to={`/polls/${_id}`}
    className="rounded overflow-hidden  shadow-md w-full md:w-1/2 lg:w-1/4 px-2 mb-4"
    data-testid={`poll-${_id}`}
  >
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{name}</div>
      <p className="text-gray-700 text-base">{description}</p>
    </div>
  </Link>
);

export default Poll;
