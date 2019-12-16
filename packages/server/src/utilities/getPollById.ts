import Poll from 'src/polls/Poll';
import PollType from '@customTypes/Poll';
import getResource from '@utilities/getResource';

const getPollById = async (_id: string): Promise<PollType> =>
  getResource<PollType>(Poll, { _id });

export default getPollById;
