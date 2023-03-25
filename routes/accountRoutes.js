import express from 'express'
import { deleteAccount, getAccount, getAccounts, updateAccount } from '../controllers/accountController.js';
import accountQueries from '../middlewares/accountQueries.js';
import Account from '../models/Account.js'

const router = express.Router();

router.route('/').get(accountQueries, getAccounts)
router.route('/:id').get(getAccount).put(updateAccount)

export default router