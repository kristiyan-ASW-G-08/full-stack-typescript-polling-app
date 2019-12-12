import mongoose, { Document } from 'mongoose';
import CommonOption from '@poll/common/source/types/Option';

export default interface Option extends CommonOption, Document {
  poll: mongoose.Types.ObjectId;
}
