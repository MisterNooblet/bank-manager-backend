import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import colors from 'colors'
import connectDB from './config/mongo.js';

import users from './routes/userRoutes.js'
import accounts from './routes/accountRoutes.js'
import transactions from './routes/transactionRoutes.js'

config({ path: './config/config.env' });

const app = express();
app.use(express.json());
connectDB();

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

const PORT = process.env.PORT || 8080;

app.use('/api/v1/users', users)
app.use('/api/v1/accounts', accounts)
app.use('/api/v1/transactions', transactions)



const server = app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);
