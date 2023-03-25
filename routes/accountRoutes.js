import express from 'express'
import { getAccounts } from '../controllers/accountController.js';
import Account from '../models/Account.js'

const router = express.Router();

router.route('/').get(getAccounts)

export default router