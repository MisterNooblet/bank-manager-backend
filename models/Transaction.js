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
      default: 0
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Transaction', transactionSchema);
