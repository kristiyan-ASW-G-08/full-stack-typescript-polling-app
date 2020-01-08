import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import passErrorToNext from '@utilities/passErrorToNext';
import getPollById from '@utilities/getPollById';
import findResources from '@utilities/findResources';
import renderUrl from '@utilities/renderUrl';
import Poll from '@polls/Poll';
import PollType from '@customTypes/Poll';
import Option from '@pollOptions/Option';

export const postPoll = async (
  { body, userId }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name, description, options, endDate } = body;
    const { _id } = await new Poll({
      name,
      description,
      endDate,
      creator: userId,
    }).save();
    const optionObjects = options.map((option: string): {
      name: string;
      poll: mongoose.Types.ObjectId;
    } => ({ name: option, poll: _id }));
    await Option.insertMany(optionObjects);

    res.status(200).json({ data: { pollId: _id } });
  } catch (err) {
    passErrorToNext(err, next);
  }
};

export const getPoll = async (
  { params }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { pollId } = params;
    const poll = await getPollById(pollId);
    const options = await Option.find({ poll: pollId });
    res.status(200).json({ data: { poll, options } });
  } catch (err) {
    passErrorToNext(err, next);
  }
};

export const getPolls = async (
  { pagination }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { SERVER_URL } = process.env;
    const { page, limit } = pagination;
    const { documents, count } = await findResources<PollType>(
      Poll,
      page,
      limit,
      {},
    );

    const nextPage =
      count > 0
        ? renderUrl(SERVER_URL, `polls`, {
            page: page + 1,
            limit,
          })
        : null;

    const prev =
      page > 1
        ? renderUrl(SERVER_URL, `polls`, {
            page: page - 1,
            limit,
          })
        : null;
    res.status(200).json({
      data: {
        polls: documents,
        links: {
          next: nextPage,
          prev,
        },
      },
    });
  } catch (err) {
    passErrorToNext(err, next);
  }
};
