import { TRANSACTION_NEGATIVE, TRANSACTION_OK } from "../constants/messages.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import Account from "../models/Account.js";
import Transaction from "../models/Transaction.js";

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


// @desc    Update account
// @route   PUT /api/v1/accounts/:id
// @access  Public

export const updateAccount = asyncHandler(async (req, res, next) => {
    // let account = await Account.findOneAndUpdate({ _id: req.params.id }, { credit: req.body.credit, isActive: req.body.isActive, balance: req.body.balance })
    let account = await Account.findById(req.params.id)
    if (req.body.credit) { account.credit = req.body.credit }
    if (req.body.isActive) { account.isActive = req.body.isActive }
    account = await account.save()
    res.status(200).json({
        success: true,
        data: account,
    });
})

// @desc    Deposit to account
// @route   POST /api/v1/accounts/:id/insideactions
// @access  Public

export const depositToAccount = asyncHandler(async (req, res, next) => {
    let account = await Account.findById(req.params.id)
    let prevBalance = account.balance

    const transaction = await createTransaction(false, {
        prevBalance: prevBalance,
        newBalance: account.balance,
        from: account._id,
        isWithdraw: true,
        amount: req.body.amount
    })

    res.status(200).json({
        success: true,
        data: transaction[0],
        transaction: transaction[1],
        message: TRANSACTION_OK
    });

})


// @desc    Transfer to account
// @route   POST /api/v1/accounts/:id/transfer
// @access  Public

export const transferToAccount = asyncHandler(async (req, res, next) => {
    if (req.body.amount > 0) {

        let account = await Account.findById(req.params.id)
        let prevBalance = account.balance
        const transaction = await createTransaction(true, {
            prevBalance: prevBalance,
            newBalance: account.balance,
            from: account._id,
            to: req.body.to,
            isWithdraw: true,
            amount: req.body.amount
        })
        res.status(200).json({
            success: true,
            data: transaction[0],
            transaction: transaction[1],
            message: TRANSACTION_OK
        });
    } else {
        res.status(500).json({
            success: false,
            message: TRANSACTION_NEGATIVE
        })
    }
})


const createTransaction = async (transfer, params) => {
    let result;
    let transaction = new Transaction({ ...params })
    transaction = await transaction.save()

    if (transfer) {
        const reciever = await Account.findById(transaction.to)
        reciever.transactions.push(transaction._id)
        reciever.balance += params.amount
        await reciever.save()
    }

    let account = await Account.findById(transaction.from)
    account.transactions.push(transaction._id)
    account.balance = account.balance -= params.amount
    account = await account.save()
    return [account, transaction._id]
}