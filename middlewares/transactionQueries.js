import { ALL_OK, NO_RESULTS } from "../constants/messages.js";
import Transaction from "../models/Transaction.js";
const transactionQueries = async (req, res, next) => {
    let query = {}
    let result;
    res.transactionQuery = {}
    let reqQuery = req.query

    if (!Object.keys(reqQuery).length) {

        result = await Transaction.find()

    } else {

        if (reqQuery.amountMin && !reqQuery.amountMax) {
            query = { ...query, amount: { $gte: reqQuery.amountMin } }
        }

        if (!reqQuery.amountMin && reqQuery.amountMax) {
            query = { ...query, amount: { $lte: reqQuery.amountMax } }
        }

        if (reqQuery.amountMin && reqQuery.amountMax) {
            query = { ...query, amount: { $gte: reqQuery.amountMin, $lte: reqQuery.amountMax } }
        }

        if (reqQuery.type) {
            query = { ...query, type: reqQuery.type }
        }

        result = await Transaction.find(query)

    };

    res.transactionQuery = {
        ...res.transactionQuery,
        success: true,
        data: result,
        message: result.length === 0 ? NO_RESULTS : ALL_OK
    }

    next();
}
export default transactionQueries;