import Vote from 'src/votes/Vote';
import VoteType from '@customTypes/Vote';
import getResource from '@utilities/getResource';

export const getVoteByUser = async (userId: string): Promise<VoteType> =>
  getResource<VoteType>(Vote, { name: 'voter', value: userId });

export const getVoteById = async (voteId: string): Promise<VoteType> =>
  getResource<VoteType>(Vote, { name: '_id', value: voteId });
