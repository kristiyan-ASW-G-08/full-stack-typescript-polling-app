import getPollById from '@utilities/getPollById';
import Poll from '@polls/Poll';
import getResource from '@utilities/getResource';

jest.mock('@utilities/getResource');

const getResourceMock = getResource as jest.MockedFunction<typeof getResource>;

describe('getPollById', (): void => {
  it(`should call getResource`, async (): Promise<void> => {
    expect.assertions(2);
    const pollId = 'pollId';
    await getPollById(pollId);

    expect(getResource).toHaveBeenCalledTimes(1);
    expect(getResourceMock).toHaveBeenCalledWith(Poll, {
      _id: pollId,
    });
  });
});
