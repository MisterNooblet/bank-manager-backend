import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import colors from 'colors'
import connectDB from './config/mongo.js';

import users from './routes/userRoutes.js'
import accounts from './routes/accountRoutes.js'
import transactions from './routes/transactionRoutes.js'
import errorHandler from './controllers/errorHandler.js';

config({ path: './config/config.env' });

connectDB();
const app = express();
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to AR Bank API'
  });
});

app.use('/api/v1/users', users)
app.use('/api/v1/accounts', accounts)
app.use('/api/v1/transactions', transactions)

app.use(errorHandler)

const PORT = process.env.PORT || 8080;

const server = app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);
