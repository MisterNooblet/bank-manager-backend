import asyncHandler from "../middlewares/asyncHandler.js";
import Account from "../models/Account.js";

// @desc    Get all accounts
// @route   GET /api/v1/accounts
// @access  Public
export const getAccounts = asyncHandler(async (req, res, next) => {
    const accounts = await Account.find()
    res.status(200).json(res.accountQuery);
});

// @desc    Get account
// @route   GET /api/v1/accounts/:id
// @access  Public

export const getAccount = asyncHandler(async (req, res, next) => {
    const account = await Account.findById(req.params.id)
    res.status(200).json({
        success: true,
        data: account,
    });
})

// @desc    Delete account
// @route   DELETE /api/v1/accounts/:id
// @access  Public

export const deleteAccount = asyncHandler(async (req, res, next) => {
    let account = await Account.findOneAndRemove({ _id: req.params.id })
    res.status(200).json({
        success: true,
        data: account,
    });
})

// @desc    Update account
// @route   PUT /api/v1/accounts/:id
// @access  Public

export const updateAccount = asyncHandler(async (req, res, next) => {
    let account = await Account.findOneAndUpdate({ _id: req.params.id }, { credit: req.body.credit, isActive: req.body.isActive, balance: req.body.balance })
    account = await Account.findById(req.params.id)
    res.status(200).json({
        success: true,
        data: account,
    });
})