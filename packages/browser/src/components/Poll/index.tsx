import React, { FC } from "react";
import PollType from "types/Poll";

interface PollProps {
  poll: PollType;
}
const Poll: FC<PollProps> = poll => <div>Poll</div>;

export default Poll;
