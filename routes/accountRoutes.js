import express from 'express'
import { depositToAccount, getAccount, getAccounts, transferToAccount, updateAccount } from '../controllers/accountController.js';
import accountQueries from '../middlewares/accountQueries.js';
import advancedQueries from '../middlewares/advancedQueries.js';

import Account from '../models/Account.js';



const router = express.Router();

router.route('/').get(advancedQueries(Account, 'account'), getAccounts)
// router.route('/').get(accountQueries, getAccounts)
router.route('/:id').get(getAccount).put(updateAccount)
router.route('/:id/withdraw').post()
router.route('/:id/insideactions').post(depositToAccount)
router.route('/:id/transfer').post(transferToAccount)

export default router