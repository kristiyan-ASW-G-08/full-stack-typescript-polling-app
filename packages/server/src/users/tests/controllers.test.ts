import httpMocks from 'node-mocks-http';
import bcrypt from 'bcryptjs';
import { signUp, logIn } from '@users/controllers';
import getResource from '@utilities/getResource';
import UserType from '@customTypes/User';
import passErrorToNext from '@utilities/passErrorToNext';
import jwt from 'jsonwebtoken';
import RESTError, { errors } from '@utilities/RESTError';
import ValidationError from '@metp/common/source/types/ValidationError';
import sendEmail from '@utilities/sendEmail';
import User from '@users/User';

jest.mock('@utilities/sendEmail');
jest.mock('@utilities/passErrorToNext');
jest.mock('@utilities/getResource');
jest.mock('@utilities/RESTError');
jest.mock('@users/User');

const jwtMock = jwt as jest.Mocked<typeof jwt>;
const bcryptjs = bcrypt as jest.Mocked<typeof bcrypt>;
const getResourceMock = getResource as jest.MockedFunction<typeof getResource>;
const passErrorToNextMock = passErrorToNext as jest.MockedFunction<
  typeof passErrorToNext
>;
const sendEmailMock = sendEmail as jest.MockedFunction<typeof sendEmail>;
const UserMock = User as jest.MockedClass<typeof User>;

const RESTErrorMock = RESTError as jest.MockedClass<typeof RESTError>;
RESTErrorMock.mockImplementation(
  (status: number, message: string, data?: ValidationError[] | string) => ({
    status,
    message,
    data,
    name: 'error',
  }),
);

describe('User controllers', () => {
  const username = 'username';
  const email = 'testEmail@mail.com';
  const password = 'testPassword';
  const location = 'TestCity';
  const { JWT_SECRET } = process.env;

  afterEach(() => jest.clearAllMocks());
  afterAll(() => jest.restoreAllMocks());
  describe('logIn', () => {
    const mockToken = 'mockToken';
    const hashedPassword = bcrypt.hashSync(password, 12);

    const mockUser = ({
      email,
      password: hashedPassword,
      username,
      bio: '',
      location,
      groups: [],
      events: [],
      avatar: '',
      date: '',
      isConfirmed: true,
      _id: 'mockUserId',
    } as unknown) as UserType;

    // spies
    jest.spyOn(jwt, 'sign').mockImplementation(() => mockToken);
    jest.spyOn(bcrypt, 'compare');

    // mock implementations
    getResourceMock.mockResolvedValue(mockUser);

    it('successful log in', async () => {
      expect.assertions(12);
      const { bio, groups, events, avatar, date, _id } = mockUser;

      const body = {
        email: 'testTest@test.test',
        password,
      };

      // mocks
      const req = httpMocks.createRequest({
        method: 'POST',
        url: '/users/user/login',
        body,
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();

      // spies
      jest.spyOn(res, 'status');
      jest.spyOn(res, 'json');

      await logIn(req, res, next);

      expect(bcrypt.compare).toHaveBeenCalledTimes(1);
      expect(bcrypt.compare).toHaveBeenCalledWith(
        body.password,
        mockUser.password,
      );
      expect(bcrypt.compare).toHaveReturnedTimes(1);

      expect(jwt.sign).toHaveBeenCalledTimes(1);
      expect(jwt.sign).toHaveBeenLastCalledWith(
        { userId: 'mockUserId' },
        JWT_SECRET,
        { expiresIn: '1h' },
      );
      expect(jwt.sign).toHaveReturnedTimes(1);
      expect(jwt.sign).toHaveReturnedWith(mockToken);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        data: {
          token: mockToken,
          user: { username, bio, location, groups, events, avatar, date, _id },
        },
      });

      expect(passErrorToNext).not.toHaveBeenCalled();
    });

    it('unsuccessful log in: wrong password', async () => {
      expect.assertions(8);
      const body = {
        email: 'testTest@test.test',
        password: 'incorrectPassword',
      };
      // mocks
      const req = httpMocks.createRequest({
        method: 'POST',
        url: '/users/user/login',
        body,
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();

      // spies
      jest.spyOn(res, 'status');

      const validationErrors: ValidationError[] = [
        { path: 'password', message: 'Wrong password' },
      ];
      const { status, message } = errors.Unauthorized;
      const error = new RESTError(status, message, validationErrors);
      RESTErrorMock.mockClear();

      await logIn(req, res, next);

      expect(bcrypt.compare).toHaveBeenCalledTimes(1);
      expect(bcrypt.compare).toHaveBeenCalledWith(
        body.password,
        mockUser.password,
      );
      expect(bcrypt.compare).toHaveReturnedTimes(1);

      expect(res.status).not.toHaveBeenCalled();

      expect(RESTError).toHaveBeenCalledTimes(1);
      expect(RESTError).toHaveBeenCalledWith(status, message, validationErrors);
      expect(passErrorToNextMock).toHaveBeenCalledTimes(1);
      expect(passErrorToNextMock).toHaveBeenCalledWith(error, next);
    });
    it('unsuccessful log in: unconfirmed user', async () => {
      expect.assertions(6);
      mockUser.isConfirmed = false;
      const body = {
        email: 'testTest@test.test',
        password: 'incorrectPassword',
      };

      // mocks
      const req = httpMocks.createRequest({
        method: 'POST',
        url: '/users/user/login',
        body,
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();

      // spies
      jest.spyOn(res, 'status');

      const validationErrors: ValidationError[] = [
        { path: 'email', message: 'Confirm your email to log in' },
      ];
      const { status, message } = errors.Unauthorized;
      const error = new RESTError(status, message, validationErrors);
      RESTErrorMock.mockClear();

      await logIn(req, res, next);

      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();

      expect(RESTError).toHaveBeenCalledTimes(1);
      expect(RESTError).toHaveBeenCalledWith(status, message, validationErrors);
      expect(passErrorToNextMock).toHaveBeenCalledTimes(1);
      expect(passErrorToNextMock).toHaveBeenCalledWith(error, next);
    });
  });

  describe('signUp', () => {
    const hashedPassword = 'hashedPassword';
    const mockId = 'mockId';
    it('successful sign u[', async () => {
      expect.assertions(6);
      const save = jest.fn();
      // @ts-ignore
      UserMock.mockImplementation(() => ({ _id: mockId, save }));
      const body = {
        username,
        location,
        email,
        password,
      };
      // mocks
      const req = httpMocks.createRequest({
        method: 'POST',
        url: '/users/user/login',
        body,
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();

      // spies
      jest.spyOn(res, 'sendStatus');
      jest
        .spyOn(bcrypt, 'hash')
        .mockImplementation(() => Promise.resolve(hashedPassword));

      await signUp(req, res, next);

      expect(UserMock).toHaveBeenCalledTimes(1);
      expect(UserMock).toHaveBeenCalledWith({
        email,
        location,
        username,
        password: hashedPassword,
      });
      expect(save).toHaveBeenCalledTimes(1);

      expect(sendEmailMock).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(201);
    });
  });
});
