import mongoose, { Schema } from 'mongoose';
import Option from '@customTypes/Option';

const OptionSchema: Schema = new Schema({
  name: {
    required: true,
    type: String,
    minlength: 1,
    maxlength: 200,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  poll: {
    type: Schema.Types.ObjectId,
    ref: 'Poll',
  },
});

export default mongoose.model<Option>('Option', OptionSchema);
