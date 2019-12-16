import User from 'src/users/User';
import UserType from '@customTypes/User';
import getResource from '@utilities/getResource';

export const getUserByEmail = async (email: string): Promise<UserType> =>
  getResource<UserType>(User, { email });

export const getUserById = async (
  _id: string,
  secure: boolean = true,
): Promise<UserType> =>
  getResource<UserType>(
    User,
    { _id },
    secure ? '' : '-password -email -confirmed',
  );
