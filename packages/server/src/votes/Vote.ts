import mongoose, { Schema } from 'mongoose';
import Vote from '@customTypes/Vote';

const VoteSchema: Schema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  voter: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  option: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Option',
  },
  poll: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Poll',
  },
});

export default mongoose.model<Vote>('Vote', VoteSchema);
