import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    passportID: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    netWorth: {
      type: Number,
      default: 0,
    },
    accounts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', userSchema);
