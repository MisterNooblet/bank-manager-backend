import mongoose from 'mongoose';
import User from './User.js';

const accountSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    credit: {
      type: Number,
      default: 0,
    },
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
      },
    ],
  },
  {
    timestamps: true,
  }
);

accountSchema.post('save', async function (doc, next) {
  try {
    accountSchema.pre('save', async function () {
      // Update the user's netWorth whenever an account is updated
      const user = await User.findById(this.owner);
      if (user) {
        await user.updateNetWorth();
      }
    });

    next()
  } catch (error) {
    next(error)
  }

});
export default mongoose.model('Account', accountSchema);
