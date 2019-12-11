import mongoose, { Document } from 'mongoose';
import CommonOption from '@poll/common/source/types/Option';

export default interface Option extends CommonOption, Document {
  creator: mongoose.Types.ObjectId;
  poll: mongoose.Types.ObjectId;
}
