import axios from "axios";
import { wait } from "@testing-library/react";
import getPolls from "./getPolls";

jest.mock("axios");
const axiosMock = axios as jest.Mocked<typeof axios>;
const data = {
  data: { polls: [], links: { next: null, prev: null } }
};
axiosMock.get.mockResolvedValue({
  data
});

describe("getPolls", () => {
  const url = "url";
  it("resolves", async () => {
    expect.assertions(3);
    await expect(getPolls(url)).resolves.toEqual({
      newPolls: [],
      next: null,
      prev: null
    });
    await wait(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(url);
    });
  });
});
