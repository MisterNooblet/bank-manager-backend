import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true
    },
    prevBalance: {
      type: Number,
      required: false
    },
    newBalance: {
      type: Number,
      required: false
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Transaction', transactionSchema);
