import axios from "axios";
import Poll from "types/Poll";

const getPolls = async (
  url: string
): Promise<{
  newPolls: Poll[];
  next: string | null;
  prev: string | null;
}> => {
  const response = await axios.get(url);
  const { links, polls } = response.data.data;
  const { next, prev } = links;
  return { newPolls: polls, next, prev };
};

export default getPolls;
