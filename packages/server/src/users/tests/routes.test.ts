import mongoose from 'mongoose';
import request from 'supertest';
import bcypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '@users/User';
import connectToDB from '@utilities/connectToDB';
import sendEmail from '@utilities/sendEmail';
import app from 'src/app';

jest.mock('@utilities/sendEmail');

const sendEmailMock = sendEmail as jest.MockedFunction<typeof sendEmail>;

type routes = [
  string,
  () => Promise<void>,
  number,
  { [key: string]: string | number },
][];
describe('User routes', () => {
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
  const hashedPassword = bcypt.hashSync(password);
  const location = 'TestCity';
  beforeAll(
    async (): Promise<void> => {
      await mongoose.disconnect();
      await connectToDB(mongoURI);
      app.listen(port);
      await User.deleteMany({}).exec();
    },
  );
  afterEach(
    async (): Promise<void> => {
      await User.deleteMany({}).exec();
    },
  );
  afterAll(
    async (): Promise<void> => {
      await mongoose.disconnect();
    },
  );
  describe('Login route - post:/users/user/login', () => {
    it('should respond with a status of 200 on successful login', async () => {
      expect.assertions(1);
      await User.insertMany([
        {
          username,
          email,
          password: hashedPassword,
          location,
          isConfirmed: true,
        },
      ]);
      const { status } = await request(app)
        .post('/users/user/login')
        .send({
          email,
          password,
        });
      expect(status).toBe(200);
    });
    it("should respond with a status of 401 when the user hasn't confirmed his email", async () => {
      expect.assertions(1);
      await User.insertMany([
        {
          username,
          email,
          password: hashedPassword,
          location,
          isConfirmed: false,
        },
      ]);
      const { status } = await request(app)
        .post('/users/user/login')
        .send({
          email,
          password,
        });
      expect(status).toBe(401);
    });
    it("should respond with a status of 401 when the passwords don't match", async () => {
      expect.assertions(1);
      await User.insertMany([
        {
          username,
          email,
          password: hashedPassword,
          location,
          isConfirmed: true,
        },
      ]);
      const { status } = await request(app)
        .post('/users/user/login')
        .send({
          email,
          password: 'nonMatchingPassword',
        });
      expect(status).toBe(401);
    });
    it("should respond with a status of 404 when an user with a matching email isn't found", async () => {
      expect.assertions(1);
      const { status } = await request(app)
        .post('/users/user/login')
        .send({
          email,
          password,
        });
      expect(status).toBe(404);
    });
  });

  describe('Sign up route - post:/users', () => {
    it('should respond with a status of 201 on successful sign up', async () => {
      expect.assertions(1);
      const { status } = await request(app)
        .post('/users')
        .send({
          username,
          email,
          location,
          password,
          confirmationPassword: password,
        });
      expect(status).toBe(201);
    });
    it("should respond with a status of 400 if the request body doesn't pass validation", async () => {
      expect.assertions(1);
      const { status } = await request(app)
        .post('/users')
        .send({});
      expect(status).toBe(400);
    });
  });
  describe.only('Edit profile route - patch:/users/user authentication required', () => {
    let token: string;
    beforeEach(async () => {
      const user = new User({
        username,
        location,
        email,
        password,
        confirmed: true,
      });
      await user.save();

      token = sign(
        {
          userId: user._id,
        },
        JWT_SECRET,
        { expiresIn: '1h' },
      );
    });
    it('should respond with a status of 200 on successful edit', async () => {
      expect.assertions(1);

      const { status } = await request(app)
        .patch('/users/user')
        .set('Authorization', `Bearer ${token}`)
        .send({
          username: 'UpdatedUsername',
          location: 'UpdatedLocation',
          bio: 'UpdatedLocation',
        });
      expect(status).toBe(200);
    });
    it("should respond with a status of 400 if the request body doesn't pass validation", async () => {
      expect.assertions(1);
      const { status } = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({});
      expect(status).toBe(400);
    });
    it("should respond with a status of 400 if the request body doesn't pass validation", async () => {
      expect.assertions(1);
      const { status } = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({});
      expect(status).toBe(400);
    });
    it("should respond with a status of 401 if there is no authorization header or it's contents are invalid", async () => {
      expect.assertions(1);
      const { status } = await request(app)
        .post('/users')
        .send({
          username: 'UpdatedUsername',
          location: 'UpdatedLocation',
          bio: 'UpdatedLocation',
        });
      expect(status).toBe(400);
    });
    it("should respond with a status of 404 when the user isn't found", async () => {
      expect.assertions(1);
      const notFoundToken = sign(
        {
          userId: mongoose.Types.ObjectId(),
        },
        JWT_SECRET,
        { expiresIn: '1h' },
      );
      const { status } = await request(app)
        .patch('/users/user')
        .set('Authorization', `Bearer ${notFoundToken}`)
        .send({
          username: 'UpdatedUsername',
          location: 'UpdatedLocation',
          bio: 'UpdatedLocation',
        });
      expect(status).toBe(404);
    });
  });
});
