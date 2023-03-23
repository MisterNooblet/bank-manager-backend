import { Schema, model } from 'mongoose';
const transactionSchema = new Schema({
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
export default model('Account', transactionSchema);
