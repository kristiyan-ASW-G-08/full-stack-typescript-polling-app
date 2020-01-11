import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import User from '@users/User';
import UserType from '@customTypes/User';
import MailOptions from '@customTypes/MailOptions';
import passErrorToNext from '@utilities/passErrorToNext';
import getResource from '@utilities/getResource';
import RESTError, { errors } from '@utilities/RESTError';
import sendEmail from '@utilities/sendEmail';
import hasConfirmedEmail from '@utilities/hasConfirmedEmail';
import { getUserByEmail, getUserById } from '@utilities/getUser';

export const signUp = async (
  { body }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { username, location, email, password } = body;
    const { EMAIL, CLIENT_URL, JWT_SECRET } = process.env;
    const user = await new User({
      username,
      location,
      email,
      password: await bcrypt.hash(password, 12),
    }).save();

    const token = sign(
      {
        userId: user._id,
      },
      JWT_SECRET,
      { expiresIn: '168h' },
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
    const user = await getUserByEmail(email);
    hasConfirmedEmail(user.isConfirmed);
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
      { expiresIn: '168h' },
    );

    const { username, date, _id, polls, voted } = user;
    res.status(200).json({
      data: {
        token,
        user: {
          username,
          polls,
          voted,
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
    const { username } = body;
    const user = await getUserById(userId);
    user.username = username;
    await user.save();
    res.status(200).json({ data: { user } });
  } catch (err) {
    passErrorToNext(err, next);
  }
};

export const verifyEmail = async (
  { params }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { JWT_SECRET } = process.env;
    const { token } = params;
    // @ts-ignore
    const { userId } = verify(token, JWT_SECRET);
    const user = await getUserById(userId);
    user.isConfirmed = true;
    await user.save();
    res.sendStatus(204);
  } catch (err) {
    passErrorToNext(err, next);
  }
};

export const requestPasswordResetEmail = async (
  { body }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email } = body;
    const { EMAIL, CLIENT_URL, JWT_SECRET } = process.env;
    const user = await getUserByEmail(email);

    hasConfirmedEmail(user.isConfirmed);
    const token = sign(
      {
        userId: user._id,
      },
      JWT_SECRET,
      { expiresIn: '1h' },
    );
    const url = `${CLIENT_URL}/reset/${token}`;

    const mailOptions: MailOptions = {
      from: EMAIL,
      to: email,
      subject: 'MeetUpClone Password Reset',
      html: `<a href="${url}">Reset your Password</a>`,
    };
    sendEmail(mailOptions);
    res.sendStatus(204);
  } catch (err) {
    passErrorToNext(err, next);
  }
};

export const resetPassword = async (
  { userId, body }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { password } = body;
    const user = await getUserById(userId);
    user.password = await bcrypt.hash(password, 12);
    await user.save();
    res.sendStatus(204);
  } catch (err) {
    passErrorToNext(err, next);
  }
};
