import { Request, Response, NextFunction } from 'express';
import User from '@users/User';
import Vote from '@votes/Vote';
import passErrorToNext from '@utilities/passErrorToNext';
import getGeoData from '@utilities/getGeoData';
import { getUserById } from '@utilities/getUser';

export const postVote = async (
  { userId, body, params }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { GEO_KEY } = process.env;
    const { optionId, pollId } = params;
    const { latitude, longitude } = body;
    const user = await getUserById(userId);
    const { country } = (
      await getGeoData(latitude, longitude, GEO_KEY)
    )?.results?.components;
    await new Vote({
      voter: userId,
      option: params.optionId,
      poll: pollId,
      location: {
        latitude,
        longitude,
        country,
      },
    }).save();
    res.sendStatus(204);
  } catch (err) {
    passErrorToNext(err, next);
  }
};

export default postVote;
