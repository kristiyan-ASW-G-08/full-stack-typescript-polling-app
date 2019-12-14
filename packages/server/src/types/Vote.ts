import mongoose, { Document } from 'mongoose';
import CommonVote from '@poll/common/source/types/Vote';

export default interface Vote extends CommonVote, Document {
  voter: mongoose.Types.ObjectId;
  option: mongoose.Types.ObjectId;
  poll: mongoose.Types.ObjectId;
}
