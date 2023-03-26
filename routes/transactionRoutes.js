import express from 'express'
import { getTransactions, getUserTransactions } from '../controllers/transactionController.js';
import advancedQueries from '../middlewares/advancedQueries.js';
import Transaction from '../models/Transaction.js';


const router = express.Router();

router.route('/').get(advancedQueries(Transaction, 'transaction'), getTransactions)
router.route('/from').get(getUserTransactions)

export default router