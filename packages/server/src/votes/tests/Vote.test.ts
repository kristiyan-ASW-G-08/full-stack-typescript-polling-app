import mongoose from 'mongoose';
import Vote from '@votes/Vote';
import VoteType from '@customTypes/Vote';
import connectToDB from '@utilities/connectToDB';

describe('Vote', () => {
  const voter = mongoose.Types.ObjectId();
  const option = mongoose.Types.ObjectId();
  const poll = mongoose.Types.ObjectId();
  beforeAll(async () => {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE } = process.env;
    const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-zmcyw.mongodb.net/${MONGO_DATABASE}?retryWrites=true`;
    await connectToDB(mongoURI);
    await Vote.deleteMany({});
  });
  afterEach(async () => {
    jest.clearAllMocks();
    await Vote.deleteMany({});
  });
  afterAll(async () => {
    jest.resetAllMocks();
    await mongoose.disconnect();
  });

  it('should create a new vote when validation is successful', async () => {
    expect.assertions(5);

    const vote: VoteType = new Vote({
      voter,
      option,
      poll,
    });

    await expect(vote.save()).resolves.not.toThrowError();

    expect(vote.voter.equals(voter)).toBeTruthy();
    expect(vote.option.equals(option)).toBeTruthy();
    expect(vote.poll.equals(poll)).toBeTruthy();
    expect(vote.date).toBeDefined();
  });
});
