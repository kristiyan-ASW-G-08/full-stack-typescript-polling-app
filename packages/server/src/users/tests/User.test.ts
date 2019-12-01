import mongoose from 'mongoose';
import User from 'src/users/User';
import UserType from '@customTypes/User';
import connectToDB from '@utilities/connectToDB';
import duplicationErrorHandler from '@customMiddleware/duplicationErrorHandler';

jest.mock('@customMiddleware/duplicationErrorHandler');

const duplicationErrorHandlerMock = duplicationErrorHandler as jest.MockedFunction<
  typeof duplicationErrorHandler
>;

describe('User', () => {
  const username = 'username';
  const email = 'testEmail@mail.com';
  const password = 'testPassword';
  const location = 'TestCity';
  beforeAll(async () => {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE } = process.env;
    const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-zmcyw.mongodb.net/${MONGO_DATABASE}?retryWrites=true`;
    await connectToDB(mongoURI);
    await User.deleteMany({});
  });
  afterEach(async () => {
    jest.clearAllMocks();
    await User.deleteMany({});
  });
  afterAll(async () => {
    jest.resetAllMocks();
    await mongoose.disconnect();
  });
  it('should throw an error when validation is not passed', async () => {
    const userObj = {
      username,
      email,
      password,
      location,
    };
    await User.insertMany([userObj]);
    const user = new User(userObj);
    await expect(user.save()).rejects.toThrowError();
    expect(duplicationErrorHandlerMock).toHaveBeenCalledTimes(0);
    expect(user.validate).toThrowError();
  });
  it('should create a new user when validation is successful', async () => {
    // expect.assertions(6);

    const user: UserType = new User({
      username,
      email,
      password,
      location,
    });

    await expect(user.save()).resolves.not.toThrowError();

    expect(duplicationErrorHandlerMock).toHaveBeenCalledTimes(1);

    expect(user.username).toBe(username);
    expect(user.email).toBe(email);
    expect(user.password).toBe(password);
    expect(user.location).toBe(location);
    expect(user.isConfirmed).toBeFalsy();
    expect(user.date).toBeDefined();
    expect(user._id).toBeDefined();
    expect(user.avatar).toBeUndefined();
    expect(user.bio).toBeUndefined();
    expect(user.groups.length).toBe(0);
    expect(user.events.length).toBe(0);
  });
});
