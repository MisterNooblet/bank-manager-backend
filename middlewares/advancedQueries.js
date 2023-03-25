import { ALL_OK, NO_RESULTS } from "../constants/messages.js";
import { AMOUNT, BALANCE, IS_ACTIVE, MAX_ACCOUNT, MAX_TRANSACTION, MAX_USER, MIN_ACCOUNT, MIN_TRANSACTION, MIN_USER, NET_WORTH, TYPE } from "../constants/queryStrings.js";

const transactionQueries = (model, type) => async (req, res, next) => {
    console.log(model, type);
    const minString = type === 'transaction' ? MIN_TRANSACTION : type === 'account' ? MIN_ACCOUNT : MIN_USER
    const maxString = type === 'transaction' ? MAX_TRANSACTION : type === 'account' ? MAX_ACCOUNT : MAX_USER
    const valueKey = type === 'transaction' ? AMOUNT : type === 'account' ? BALANCE : NET_WORTH
    const boolQueryName = type === 'transaction' ? TYPE : type === 'account' ? IS_ACTIVE : null
    let query = {}
    let result;
    let reqQuery = req.query

    if (!Object.keys(reqQuery).length) {
        result = await model.find()

    } else {

        if (reqQuery[minString] && !reqQuery[maxString]) {
            query = { ...query, [valueKey]: { $gte: Number(reqQuery[minString]) } }
        }

        if (!reqQuery[minString] && reqQuery[maxString]) {
            query = { ...query, [valueKey]: { $lte: reqQuery[maxString] } }
        }

        if (reqQuery[minString] && reqQuery[maxString]) {
            query = { ...query, [valueKey]: { $gte: reqQuery[minString], $lte: reqQuery[maxString] } }
        }

        if (reqQuery[boolQueryName]) {
            console.log(boolQueryName);
            query = { ...query, [boolQueryName]: reqQuery[boolQueryName] }
        }

        result = await model.find(query)

    };

    res.queryResult = {
        success: true,
        data: result,
        message: result.length === 0 ? NO_RESULTS : ALL_OK
    }

    next();
}

export default transactionQueries;