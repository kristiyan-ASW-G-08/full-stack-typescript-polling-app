import mongoose from "mongoose";
import connectToDB from "@utilities/connectToDB";
import logger from "@utilities/logger";

jest.mock("@utilities/logger");

const loggerMock = logger as jest.Mocked<typeof logger>;

describe("connectToDB", (): void => {
  const { MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE } = process.env;
  const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-zmcyw.mongodb.net/${MONGO_DATABASE}?retryWrites=true`;

  const connectSpy = jest.spyOn(mongoose, "connect");

  afterEach(() => jest.clearAllMocks());

  afterAll(
    async (): Promise<void> => {
      await mongoose.disconnect();
    }
  );
  it("should connect to mongodb", async () => {
    expect.assertions(4);

    await expect(connectToDB(mongoURI)).resolves.toBeUndefined();

    expect(connectSpy).toHaveBeenCalledTimes(1);
    expect(connectSpy).toHaveBeenCalledWith(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    expect(loggerMock.error).not.toHaveBeenCalled();
  });
  it("should not connect to mongodb", async () => {
    expect.assertions(4);

    const invalidURI = "invalidURL";

    await expect(connectToDB(invalidURI)).resolves.toBeUndefined();

    expect(connectSpy).toHaveBeenCalledTimes(1);
    expect(connectSpy).toHaveBeenCalledWith(invalidURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    expect(loggerMock.error).toHaveBeenCalledTimes(1);
  });
});
