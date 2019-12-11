import mongoose, { Schema } from 'mongoose';
import Vote from '@customTypes/Vote';

const VoteSchema: Schema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  voter: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  option: {
    type: Schema.Types.ObjectId,
    ref: 'option',
  },
});

export default mongoose.model<Vote>('Vote', VoteSchema);
