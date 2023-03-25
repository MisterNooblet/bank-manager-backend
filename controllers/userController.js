import asyncHandler from "../middlewares/asyncHandler.js";
import Account from "../models/Account.js";
import User from "../models/User.js";

// @desc    Add new user
// @route   POST /api/v1/users
// @access  Public
export const createUser = asyncHandler(async (req, res, next) => {
    const { name, passportID, credit } = req.body
    const user = await User.create({ name: name, passportID: passportID });
    if (credit) {
        const account = await Account.findById(user.accounts[0])
        account.credit = credit
        await account.save()
    }
    res.status(200).json({
        success: true,
        data: user,
    });
});
