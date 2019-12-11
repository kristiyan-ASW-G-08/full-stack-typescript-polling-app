import mongoose from 'mongoose';
import Option from '@pollOptions/Option';
import OptionType from '@customTypes/Option';
import connectToDB from '@utilities/connectToDB';

describe('Option', () => {
  const name = 'optionName';
  const poll = mongoose.Types.ObjectId();
  const creator = mongoose.Types.ObjectId();
  beforeAll(async () => {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE } = process.env;
    const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-zmcyw.mongodb.net/${MONGO_DATABASE}?retryWrites=true`;
    await connectToDB(mongoURI);
    await Option.deleteMany({});
  });
  afterEach(async () => {
    jest.clearAllMocks();
    await Option.deleteMany({});
  });
  afterAll(async () => {
    jest.resetAllMocks();
    await mongoose.disconnect();
  });

  it('should create a new option when validation is successful', async () => {
    expect.assertions(5);

    const option: OptionType = new Option({
      name,
      creator,
      poll,
    });

    await expect(option.save()).resolves.not.toThrowError();

    expect(option.name).toBe(name);
    expect(option.date).toBeDefined();
    expect(option.creator.equals(creator)).toBeTruthy();
    expect(option.poll.equals(poll)).toBeTruthy();
  });
});
