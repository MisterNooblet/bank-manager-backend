import asyncHandler from "../middlewares/asyncHandler.js";
import Account from "../models/Account.js";

// @desc    Get all accounts
// @route   GET /api/v1/accounts
// @access  Public
export const getAccounts = asyncHandler(async (req, res, next) => {
    const accounts = await Account.find()
    console.log(req.query);
    res.status(200).json(accounts);
});