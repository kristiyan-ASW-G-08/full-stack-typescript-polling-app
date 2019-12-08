import { Document } from 'mongoose';
import duplicationErrorHandler from '@customMiddleware/duplicationErrorHandler';
import RESTError, { errors } from '@utilities/RESTError';
import ValidationError from '@poll/common/source/types/ValidationError';

jest.mock('@utilities/RESTError');
const RESTErrorMock = RESTError as jest.MockedClass<typeof RESTError>;

describe('duplicationErrorHandler', () => {
  afterEach(() => jest.clearAllMocks());
  afterAll(() => jest.restoreAllMocks());
  it('should call next with RESTError containing 409 status, "Conflict" message and an array of validation errors, if the passed error is Mongo Error with 11000 code ', () => {
    expect.assertions(4);
    const nextMock = jest.fn();
    const value = 'TestUser';
    const path = 'username';

    RESTErrorMock.mockImplementationOnce(
      (status: number, message: string, data?: ValidationError[] | string) => ({
        status,
        message,
        data,
        name: 'error',
      }),
    );
    const mockMongoError = {
      name: 'MongoError',
      code: 11000,
      value,
      path,
    };
    const { status, message } = errors.Conflict;
    const validationErrors: ValidationError[] = [
      { path, message: `${value} is already taken` },
    ];
    const documentMock = ({} as unknown) as Document;
    duplicationErrorHandler(mockMongoError, documentMock, nextMock);

    expect(RESTErrorMock).toHaveBeenCalledTimes(1);
    expect(RESTErrorMock).toHaveBeenCalledWith(
      status,
      message,
      validationErrors,
    );
    expect(nextMock).toHaveBeenCalledTimes(1);
    expect(nextMock).toHaveBeenCalledWith({
      data: validationErrors,
      message,
      name: 'error',
      status,
    });
  });
  it('should call next with the passed error with all Mongo Errors, besides those with 11000 code ', () => {
    expect.assertions(3);
    const nextMock = jest.fn();
    const value = 'TestUser';
    const path = 'username';

    RESTErrorMock.mockImplementationOnce(
      (status: number, message: string, data?: ValidationError[] | string) => ({
        status,
        message,
        data,
        name: 'error',
      }),
    );
    const mockMongoError = {
      name: 'error',
      code: 'mockCode',
      value,
      path,
    };

    const documentMock = ({} as unknown) as Document;
    duplicationErrorHandler(mockMongoError, documentMock, nextMock);

    expect(RESTErrorMock).not.toHaveBeenCalled();
    expect(nextMock).toHaveBeenCalledTimes(1);
    expect(nextMock).toHaveBeenCalledWith(mockMongoError);
  });
});
