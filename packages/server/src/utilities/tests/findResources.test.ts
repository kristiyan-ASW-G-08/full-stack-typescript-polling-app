import findResources from '@utilities/findResources';
import User from '@users/User';
import UserType from '@customTypes/User';

describe('findResources', (): void => {
  afterEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());
  it(`should call all countDocuments, find, sort, skip, and limit`, async () => {
    expect.assertions(7);
    const pageNum = 1;
    const limitNum = 25;

    const limit = jest.fn();
    const skip = jest.fn(() => ({ limit }));
    const find = jest.fn(() => ({
      skip,
    }));
    const findQuery = { user: 'user' };

    jest
      .spyOn(User, 'countDocuments')
      // @ts-ignore
      .mockReturnValue({ find });

    await findResources<UserType, { user: string }>(
      User,
      pageNum,
      limitNum,
      findQuery,
    );

    expect(User.countDocuments).toHaveBeenCalledTimes(2);

    expect(find).toHaveBeenCalledTimes(1);
    expect(find).toHaveBeenCalledWith(findQuery);

    expect(skip).toHaveBeenCalledTimes(1);
    expect(skip).toHaveBeenCalledWith((pageNum - 1) * limitNum);

    expect(limit).toHaveBeenCalledTimes(1);
    expect(limit).toHaveBeenCalledWith(limitNum);
  });
});
