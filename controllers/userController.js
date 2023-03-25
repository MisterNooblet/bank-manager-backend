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
// @desc    Get users
// @route   GET /api/v1/users
// @access  Public

export const getUsers = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.queryResult)
})

// @desc    Get user
// @route   GET /api/v1/users/:id
// @access  Public

export const getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    res.status(200).json({
        success: true,
        data: user,
    });
})

// @desc    Update user
// @route   PUT /api/v1/users/:id
// @access  Public

export const updateUser = asyncHandler(async (req, res, next) => {
    let user = await User.findByIdAndUpdate(req.params.id, { name: req.body.name })
    user = await User.findById(req.params.id)
    res.status(200).json({
        success: true,
        data: user,
    });
})

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Public

export const deleteUser = asyncHandler(async (req, res, next) => {
    let user = await User.findOneAndRemove({ _id: req.params.id })
    res.status(200).json({
        success: true,
        data: user,
    });
})

// @desc    Add account to user
// @route   PUT /api/v1/users/:id/addaccount
// @access  Public

export const userAddAccount = asyncHandler(async (req, res, next) => {
    let user = await User.findById(req.params.id)
    const account = new Account({ owner: user._id });
    await account.save();
    user.accounts.push(account._id);
    await user.save();
    res.status(200).json({
        success: true,
        data: user,
    });
})
