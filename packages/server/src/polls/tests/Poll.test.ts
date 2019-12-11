import mongoose from 'mongoose';
import Poll from '@polls/Poll';
import PollType from '@customTypes/Poll';
import connectToDB from '@utilities/connectToDB';

describe('Poll', () => {
  const name = 'pollName';
  const description = 'pollDescription';
  const creator = mongoose.Types.ObjectId();
  const option = mongoose.Types.ObjectId();
  beforeAll(async () => {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE } = process.env;
    const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-zmcyw.mongodb.net/${MONGO_DATABASE}?retryWrites=true`;
    await connectToDB(mongoURI);
    await Poll.deleteMany({});
  });
  afterEach(async () => {
    jest.clearAllMocks();
    await Poll.deleteMany({});
  });
  afterAll(async () => {
    jest.resetAllMocks();
    await mongoose.disconnect();
  });

  it('should create a new poll when validation is successful', async () => {
    expect.assertions(5);

    const poll: PollType = new Poll({
      name,
      description,
      creator,
    });

    await expect(poll.save()).resolves.not.toThrowError();

    expect(poll.creator.equals(creator)).toBeTruthy();
    expect(poll.name).toBe(name);
    expect(poll.description).toBe(description);
    expect(poll.date).toBeDefined();
  });
});
