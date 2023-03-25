import asyncHandler from "../middlewares/asyncHandler.js";

// @desc    Get users
// @route   GET /api/v1/users
// @access  Public

export const getTransactions = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.queryResult)
})
