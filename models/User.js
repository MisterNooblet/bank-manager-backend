import { Schema, model } from 'mongoose';
const userSchema = new Schema({
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
            type: Schema.Types.ObjectId,
            ref: 'Account',
        },
    ],
}, {
    timestamps: true,
});
export default model('User', userSchema);
