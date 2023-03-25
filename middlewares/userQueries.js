import { ALL_OK, NO_RESULTS } from "../constants/messages.js";
import User from "../models/User.js";
const userQueries = async (req, res, next) => {
    let query = {}
    let result;
    res.userQuery = {}
    let reqQuery = req.query

    if (!Object.keys(reqQuery).length) {

        result = await User.find()

    } else {

        if (reqQuery.wealthMin && !reqQuery.wealthMax) {
            query = { ...query, netWorth: { $gte: reqQuery.wealthMin } }
        }

        if (!reqQuery.wealthMin && reqQuery.wealthMax) {
            query = { ...query, netWorth: { $lte: reqQuery.wealthMax } }
        }

        if (reqQuery.wealthMin && reqQuery.wealthMax) {
            query = { ...query, netWorth: { $gte: reqQuery.wealthMin, $lte: reqQuery.wealthMax } }
        }



        result = await User.find(query)

    };

    res.userQuery = {
        ...res.userQuery,
        success: true,
        data: result,
        message: result.length === 0 ? NO_RESULTS : ALL_OK
    }

    next();
}
export default userQueries;