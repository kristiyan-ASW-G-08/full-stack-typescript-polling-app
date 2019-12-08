import mongoose, { Schema } from 'mongoose';
import User from '@customTypes/User';
import duplicationErrorHandler from '@customMiddleware/duplicationErrorHandler';
import uniqueValidator from 'mongoose-unique-validator';

const UserSchema: Schema = new Schema({
  username: {
    required: true,
    type: String,
    minlength: 1,
    maxlength: 50,
    unique: true,
  },
  email: { required: true, type: String, minlength: 3, unique: true },
  password: { required: true, type: String, minlength: 12 },
  isConfirmed: { type: Boolean, default: false },
  date: {
    type: Date,
    default: Date.now,
  },
  polls: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Poll',
    },
  ],
  voted: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Poll',
    },
  ],
});

UserSchema.plugin(uniqueValidator);
UserSchema.post('save', duplicationErrorHandler);
UserSchema.post('update', duplicationErrorHandler);

export default mongoose.model<User>('User', UserSchema);
