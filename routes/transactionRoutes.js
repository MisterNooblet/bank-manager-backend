import express from 'express'
import { getTransactions } from '../controllers/transactionController.js';
import advancedQueries from '../middlewares/advancedQueries.js';
import Transaction from '../models/Transaction.js';


const router = express.Router();

router.route('/').get(advancedQueries(Transaction, 'transaction'), getTransactions)

export default router