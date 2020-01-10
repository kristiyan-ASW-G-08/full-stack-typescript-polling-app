import axios from "axios";
import { wait } from "@testing-library/react";
import getPoll from "./getPoll";

jest.mock("axios");
const axiosMock = axios as jest.Mocked<typeof axios>;
const data = {
  data: { poll: [], options: [] }
};
axiosMock.get.mockResolvedValue({
  data
});

describe("getPoll", () => {
  const pollId = "pollId";
  it("resolves", async () => {
    expect.assertions(3);
    await expect(getPoll(pollId)).resolves.toEqual(data);
    await wait(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL}/polls/${pollId}`
      );
    });
  });
});
