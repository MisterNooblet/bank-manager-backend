import express from 'express'
import { getTransactions } from '../controllers/transactionController.js';
import transactionQueries from '../middlewares/transactionQueries.js';


const router = express.Router();

router.route('/').get(transactionQueries, getTransactions)

export default router