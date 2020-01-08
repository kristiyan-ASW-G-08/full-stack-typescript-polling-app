import axios from "axios";
import Poll from "types/Poll";
import Option from "types/Option";

const getPoll = async (
  pollId: string
): Promise<{
  poll: Poll;
  options: Option[];
}> => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/polls/${pollId}`
  );
  const { poll, options } = response.data.data;
  return { poll, options };
};

export default getPoll;
