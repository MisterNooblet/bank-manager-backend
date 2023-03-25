import mongoose from 'mongoose';
import Account from './Account.js'

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

userSchema.post('save', async function (doc, next) {
  if (doc.accounts.length === 0) {
    try {
      const account = new Account({ owner: doc._id });
      await account.save();
      doc.accounts.push(account._id);
      await doc.save();
      next();
    } catch (error) {
      next(error);
    }
  }

});


export default mongoose.model('User', userSchema);
