import Vote from 'src/votes/Vote';
import VoteType from '@customTypes/Vote';
import getResource from '@utilities/getResource';

export const getVoteByUser = async (voterId: string): Promise<VoteType> =>
  getResource<VoteType>(Vote, { voter: voterId });

export const getVoteById = async (_id: string): Promise<VoteType> =>
  getResource<VoteType>(Vote, { _id });
