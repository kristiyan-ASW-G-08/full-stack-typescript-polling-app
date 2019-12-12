import mongoose from 'mongoose';
import request from 'supertest';
import bcypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '@users/User';
import Poll from '@polls/Poll';
import Option from '@pollOptions/Option';
import connectToDB from '@utilities/connectToDB';
import app from 'src/app';

describe('User routes', () => {
  const port = process.env.PORT || 8080;
  const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_DATABASE,
    JWT_SECRET,
  } = process.env;
  const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-zmcyw.mongodb.net/${MONGO_DATABASE}?retryWrites=true`;
  beforeAll(async () => {
    await mongoose.disconnect();
    await connectToDB(mongoURI);
    app.listen(port);
    await Poll.deleteMany({}).exec();
    await Option.deleteMany({}).exec();
  });
  beforeEach(async () => {
    await Poll.deleteMany({}).exec();
    await Option.deleteMany({}).exec();
  });
  afterEach(async () => {
    await Poll.deleteMany({}).exec();
    await Option.deleteMany({}).exec();
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });
  describe('Post a new Poll route - post:/polls authentication required', () => {
    const name = 'pollName';
    const description = 'pollDescription';
    const options = ['option1', 'option2'];
    const endDate = '1995-12-17T03:24:00';
    const token = sign(
      {
        userId: mongoose.Types.ObjectId(),
      },
      JWT_SECRET,
      { expiresIn: '1h' },
    );
    it('should respond with a status of 200 when poll is successfully created', async () => {
      expect.assertions(1);

      const { status } = await request(app)
        .post('/polls')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name,
          description,
          endDate,
          options,
        });
      expect(status).toBe(200);
    });
    it("should respond with a status of 400 if the request body doesn't pass validation", async () => {
      expect.assertions(1);

      const { status } = await request(app)
        .post('/polls')
        .set('Authorization', `Bearer ${token}`)
        .send({});
      expect(status).toBe(400);
    });
    it("should respond with a status of 401 if there is no authorization header or it's contents are invalid", async () => {
      expect.assertions(1);

      const { status } = await request(app)
        .post('/polls')
        .send({
          name,
          description,
          endDate,
          options,
        });
      expect(status).toBe(401);
    });
  });
});
