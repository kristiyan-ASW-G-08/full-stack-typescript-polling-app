import User from 'src/users/User';
import UserType from '@customTypes/User';
import getResource from '@utilities/getResource';

export const getUserByEmail = async (email: string): Promise<UserType> =>
  getResource<UserType>(User, { name: 'email', value: email });

export const getUserById = async (
  userId: string,
  secure: boolean = true,
): Promise<UserType> =>
  getResource<UserType>(
    User,
    { name: '_id', value: userId },
    secure ? '' : '-password -email -confirmed',
  );
