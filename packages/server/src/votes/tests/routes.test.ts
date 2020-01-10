import mongoose from 'mongoose';
import request from 'supertest';
import { sign } from 'jsonwebtoken';
import User from '@users/User';
import Vote from '@votes/Vote';
import Option from '@pollOptions/Option';
import connectToDB from '@utilities/connectToDB';
import app from 'src/app';

describe('Vote routes', () => {
  const port = process.env.PORT || 8080;
  const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_DATABASE,
    JWT_SECRET,
  } = process.env;
  const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-zmcyw.mongodb.net/${MONGO_DATABASE}?retryWrites=true`;
  const username = 'username';
  const email = 'testEmail@mail.com';
  const password = 'testPassword';
  beforeAll(async () => {
    await mongoose.disconnect();
    await connectToDB(mongoURI);
    app.listen(port);
    await User.deleteMany({}).exec();
    await Vote.deleteMany({}).exec();
    await Option.deleteMany({}).exec();
  });
  beforeEach(async () => {
    await User.deleteMany({}).exec();
    await Vote.deleteMany({}).exec();
    await Option.deleteMany({}).exec();
  });
  afterEach(async () => {
    await User.deleteMany({}).exec();
    await Vote.deleteMany({}).exec();
    await Option.deleteMany({}).exec();
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });
  describe('vote route - post:/polls/:pollId/options/:optionId/votes', () => {
    const pollId = mongoose.Types.ObjectId();
    let token: string;
    let userId: string;
    let optionId: string;
    beforeEach(async () => {
      const user = new User({
        username,
        email,
        password,
        confirmed: false,
      });
      await user.save();
      userId = user._id;
      const option = new Option({
        name: 'option',
        poll: pollId,
      });
      await option.save();

      optionId = option._id;
      token = sign(
        {
          userId: user._id,
        },
        JWT_SECRET,
        { expiresIn: '1h' },
      );
    });
    it('should respond with a status of 204 on successful vote', async () => {
      expect.assertions(1);
      const { status } = await request(app)
        .post(`/polls/${pollId}/options/${optionId}/votes`)
        .set('Authorization', `Bearer ${token}`);

      expect(status).toBe(204);
    });
    it('should respond with a status of 409 when the user has already voted', async () => {
      await Vote.insertMany([
        { voter: userId, poll: pollId, option: optionId },
      ]);
      expect.assertions(1);
      const { status } = await request(app)
        .post(`/polls/${pollId}/options/${optionId}/votes`)
        .set('Authorization', `Bearer ${token}`);

      expect(status).toBe(409);
    });
  });
});
