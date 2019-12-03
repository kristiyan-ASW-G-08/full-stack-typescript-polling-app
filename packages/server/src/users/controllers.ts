import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '@users/User';
import UserType from '@customTypes/User';
import MailOptions from '@customTypes/MailOptions';
import passErrorToNext from '@utilities/passErrorToNext';
import getResource from '@utilities/getResource';
import RESTError, { errors } from '@utilities/RESTError';
import sendEmail from '@utilities/sendEmail';

export const signUp = async (
  { body }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { username, location, email, password } = body;
    const { EMAIL, CLIENT_URL, JWT_SECRET } = process.env;
    const user = new User({
      username,
      location,
      email,
      password: await bcrypt.hash(password, 12),
    });
    await user.save();

    const token = sign(
      {
        userId: user._id,
      },
      JWT_SECRET,
      { expiresIn: '1h' },
    );
    const url = `${CLIENT_URL}/confirmation/${token}`;
    const mailOptions: MailOptions = {
      from: EMAIL,
      to: email,
      subject: 'MeetUpClone Email Confirmation',
      html: `<a href="${url}">Confirm your Email</a>`,
    };
    sendEmail(mailOptions);
    res.sendStatus(201);
  } catch (err) {
    passErrorToNext(err, next);
  }
};

export const logIn = async (
  { body }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = body;
    const { JWT_SECRET } = process.env;
    const user = await getResource<UserType>(User, {
      name: 'email',
      value: email,
    });
    if (!user.isConfirmed) {
      const { status, message } = errors.Unauthorized;
      throw new RESTError(status, message, [
        { path: 'email', message: 'Confirm your email to log in' },
      ]);
    }
    if (!(await bcrypt.compare(password, user.password))) {
      const { status, message } = errors.Unauthorized;
      throw new RESTError(status, message, [
        { path: 'password', message: 'Wrong password' },
      ]);
    }
    const token = sign(
      {
        userId: user._id,
      },
      JWT_SECRET,
      { expiresIn: '1h' },
    );

    const { username, bio, location, groups, events, avatar, date, _id } = user;
    res.status(200).json({
      data: {
        token,
        user: {
          username,
          bio,
          location,
          groups,
          events,
          avatar,
          date,
          _id,
        },
      },
    });
  } catch (err) {
    passErrorToNext(err, next);
  }
};

export const editUserProfile = async (
  { body, userId }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { username, bio, location } = body;
    const user = await getResource<UserType>(
      User,
      {
        name: '_id',
        value: userId,
      },
      '-password -email -confirmed',
    );
    user.username = username;
    user.bio = bio;
    user.location = location;
    await user.save();
    res.status(200).json({ data: { user } });
  } catch (err) {
    console.log(err, 'EditHereBro');
    passErrorToNext(err, next);
  }
};
