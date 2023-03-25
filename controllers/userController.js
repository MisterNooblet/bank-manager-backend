import asyncHandler from "../middlewares/asyncHandler.js";
import Account from "../models/Account.js";
import User from "../models/User.js";

// @desc    Add new user
// @route   POST /api/v1/users
// @access  Public


export const createUser = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body);
    const account = new Account({ owner: user._id })
    await account.save()
    user.accounts.push(account._id)
    await user.save();

    res.status(200).json({
        success: true,
        data: user,
    });
});
