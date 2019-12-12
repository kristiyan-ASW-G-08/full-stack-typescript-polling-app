import mongoose, { Schema } from 'mongoose';
import Poll from '@customTypes/Poll';

const PollSchema: Schema = new Schema({
  name: {
    required: true,
    type: String,
    minlength: 1,
    maxlength: 200,
  },
  description: {
    required: true,
    type: String,
    minlength: 1,
    maxlength: 1000,
  },
  endDate: {
    type: Date,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default mongoose.model<Poll>('Poll', PollSchema);
