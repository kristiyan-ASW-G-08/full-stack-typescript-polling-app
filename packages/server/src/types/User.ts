import mongoose, { Document } from 'mongoose';
import CommonUser from '@poll/common/source/types/User';

export default interface User extends CommonUser, Document {
  password: string;
  isConfirmed: boolean;
  polls: mongoose.Types.ObjectId[];
  voted: mongoose.Types.ObjectId[];
}
