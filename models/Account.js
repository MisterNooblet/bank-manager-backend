import { Schema, model } from 'mongoose';
const accountSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
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
            type: Schema.Types.ObjectId,
            ref: 'Transaction',
        },
    ],
}, {
    timestamps: true,
});
export default model('Account', accountSchema);
