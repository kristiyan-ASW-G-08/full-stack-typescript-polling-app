import mongoose, { Document } from 'mongoose';
import CommonPoll from '@poll/common/source/types/Poll';

export default interface Poll extends CommonPoll, Document {
  creator: mongoose.Types.ObjectId;
}
