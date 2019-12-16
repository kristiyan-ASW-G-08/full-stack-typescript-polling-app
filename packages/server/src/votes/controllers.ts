import { Request, Response, NextFunction } from 'express';
import Vote from '@votes/Vote';
import VoteType from '@customTypes/Vote';
import passErrorToNext from '@utilities/passErrorToNext';
import getGeoData from '@utilities/getGeoData';
import getOptionById from '@utilities/getOptionById';
import RESTError, { errors } from '@utilities/RESTError';

export const postVote = async (
  { userId, body, params }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { GEO_KEY } = process.env;
    const { optionId, pollId } = params;
    const { latitude, longitude } = body;
    const { country } = (
      await getGeoData(latitude, longitude, GEO_KEY)
    )?.results?.components;

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
      location: {
        latitude,
        longitude,
        country,
      },
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
