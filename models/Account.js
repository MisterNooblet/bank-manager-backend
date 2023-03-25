import mongoose from 'mongoose';
import User from './User.js';

const accountSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    credit: {
      type: Number,
      default: 0,
    },
    balance: {
      type: Number,
      default: 0,
      validate: {
        validator: function (v) {
          return v >= -this.credit;
        },
        message: 'Balance must be greater than or equal to -credit',
      },
    },
    isActive: {
      type: Boolean,
      default: true
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
    // Update the user's netWorth whenever an account is updated
    const user = await User.findById(doc.owner);
    if (user) {
      await user.updateNetWorth();
    }


    next()
  } catch (error) {
    next(error)
  }

});

accountSchema.pre('findOneAndRemove', async function (doc, next) {
  try {
    const user = await User.findById(doc.owner);
    const updatedAccounts = user.accounts.filter(acc => acc._id !== doc._id)
    user.accounts = updatedAccounts
    await user.save()
    next();
  } catch (error) {
    next(error);
  }
});
export default mongoose.model('Account', accountSchema);
