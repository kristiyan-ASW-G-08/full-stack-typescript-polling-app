import getOptionById from '@utilities/getOptionById';
import User from 'src/users/User';
import getResource from '@utilities/getResource';

jest.mock('@utilities/getResource');

const getResourceMock = getResource as jest.MockedFunction<typeof getResource>;

describe('getOptionById', (): void => {
  it(`should call getResource`, async (): Promise<void> => {
    expect.assertions(2);
    const optionId = 'optionId';
    await getOptionById(optionId);

    expect(getResource).toHaveBeenCalledTimes(1);
    expect(getResourceMock).toHaveBeenCalledWith(
      User,
      {
        _id: optionId,
      },
      '',
    );
  });
});
