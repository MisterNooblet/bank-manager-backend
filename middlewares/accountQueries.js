import { ALL_OK, NO_RESULTS } from "../constants/messages.js";
import Account from "../models/Account.js";
const accountQueries = async (req, res, next) => {
    let query = {}
    let result;
    res.accountQuery = {}
    let reqQuery = req.query

    if (!Object.keys(reqQuery).length) {

        result = await Account.find()

    } else {
        if (reqQuery.balanceMin && !reqQuery.balanceMax) {
            query = { ...query, balance: { $gte: reqQuery.balanceMin } }
        }

        if (!reqQuery.wealthMin && reqQuery.wealthMax) {
            query = { ...query, balance: { $lte: reqQuery.balanceMax } }
        }

        if (reqQuery.wealthMin && reqQuery.wealthMax) {
            query = { ...query, balance: { $gte: reqQuery.balanceMin, $lte: reqQuery.balanceMax } }
        }

        if (reqQuery.isActive) {
            query = { ...query, isActive: reqQuery.isActive }
        }
        result = await Account.find(query)

    };

    res.accountQuery = {
        ...res.accountQuery,
        success: true,
        data: result,
        message: result.length === 0 ? NO_RESULTS : ALL_OK
    }

    next();
}
export default accountQueries;