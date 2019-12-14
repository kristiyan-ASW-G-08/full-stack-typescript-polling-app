import { getVoteByUser, getVoteById } from '@utilities/getVote';
import Vote from 'src/votes/Vote';
import getResource from '@utilities/getResource';

jest.mock('@utilities/getResource');

const getResourceMock = getResource as jest.MockedFunction<typeof getResource>;

describe('getVote', (): void => {
  afterEach(() => jest.clearAllMocks());
  describe('getVoteById', (): void => {
    it(`should call getResource`, async (): Promise<void> => {
      const voteId = 'mockId';
      expect.assertions(2);
      await getVoteById(voteId);

      expect(getResource).toHaveBeenCalledTimes(1);
      expect(getResourceMock).toHaveBeenCalledWith(Vote, {
        name: '_id',
        value: voteId,
      });
    });
  });
  describe('getVoteByUser', (): void => {
    it(`should call getResource`, async (): Promise<void> => {
      expect.assertions(2);
      const userId = 'userId';
      await getVoteByUser(userId);

      expect(getResource).toHaveBeenCalledTimes(1);
      expect(getResourceMock).toHaveBeenCalledWith(Vote, {
        name: 'voter',
        value: userId,
      });
    });
  });
});
