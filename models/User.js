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

userSchema.post('findOneAndRemove', async function (doc, next) {
  try {
    // Delete all accounts associated with the user
    await Account.deleteMany({ owner: doc._id });
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.updateNetWorth = async function (doc, next) {
  const accounts = await Account.find({ owner: this._id });
  const netWorth = accounts.reduce((total, account) => {
    return total + account.balance;
  }, 0);
  this.netWorth = netWorth;
  await this.save();
};

userSchema.methods.addNewAccount = async function (doc, next) {
  const account = new Account({ owner: doc._id });
  await account.save();
  doc.accounts.push(account._id);
  await doc.save();
  return doc

}

export default mongoose.model('User', userSchema);
