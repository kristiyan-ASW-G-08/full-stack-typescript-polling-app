import mongoose, { Document } from 'mongoose';
import CommonUser from '@metp/common/source/types/User';

export default interface User extends CommonUser, Document {
  password: string;
  isConfirmed: boolean;
  groups: mongoose.Types.ObjectId[];
  events: mongoose.Types.ObjectId[];
}
