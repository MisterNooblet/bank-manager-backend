import asyncHandler from "../middlewares/asyncHandler.js";
import Transaction from "../models/Transaction.js";

// @desc    Get transactions
// @route   GET /api/v1/transactions
// @access  Public

export const getTransactions = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.queryResult)
})

// @desc    Get user transactions
// @route   GET /api/v1/transactions/from
// @access  Public

export const getUserTransactions = asyncHandler(async (req, res, next) => {
    const result = await Transaction.find({ from: req.body.from })
    res.status(200).json({
        success: true,
        data: result
    })
})