import httpMocks from 'node-mocks-http';
import paginationHandler from '@src/middleware/paginationHandler';

type SortKey = 'top' | 'trending' | 'new' | 'replies';
type SortString = '-likes' | '-retweets' | '-date' | '-replies';

describe('paginationHandler', (): void => {
  afterEach(() => jest.clearAllMocks());
  const limitArr = [25, 30, 35, 40, 45, 50];

  it.each(limitArr)('should return the proper limit', (limit: number): void => {
    expect.assertions(2);
    const nextMock = jest.fn();
    const reqMock = httpMocks.createRequest({
      method: 'GET',
      url: '/',
      query: {
        limit,
      },
    });
    const resMock = httpMocks.createResponse();
    paginationHandler(reqMock, resMock, nextMock);
    expect(nextMock).toBeCalledTimes(1);
    expect(reqMock.pagination).toEqual({
      limit,
      page: 1,
    });
  });
});
