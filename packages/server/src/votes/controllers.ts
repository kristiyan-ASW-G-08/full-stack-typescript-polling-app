import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import Vote from '@votes/Vote';
import passErrorToNext from '@utilities/passErrorToNext';
import getOptionById from '@utilities/getOptionById';
import RESTError, { errors } from '@utilities/RESTError';
import { getUserById } from '@src/utilities/getUser';

export const postVote = async (
  { userId, params }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { optionId, pollId } = params;
    const user = await getUserById(userId);
    user.voted = [...user.voted, mongoose.Types.ObjectId(pollId)];
    await user.save();
    const existingVote = await Vote.findOne({
      voter: userId,
      poll: pollId,
    });
    if (existingVote) {
      const { status, message } = errors.Conflict;
      throw new RESTError(status, message);
    }

    await new Vote({
      voter: userId,
      option: optionId,
      poll: pollId,
    }).save();
    const option = await getOptionById(optionId);
    option.votes += 1;
    await option.save();
    res.sendStatus(204);
  } catch (err) {
    passErrorToNext(err, next);
  }
};

export default postVote;
