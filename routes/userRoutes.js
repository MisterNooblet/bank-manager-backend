import express from 'express'
import { createUser, getUsers, getUser, updateUser, userAddAccount, deleteUser } from '../controllers/userController.js';
import userQueries from '../middlewares/userQueries.js'
import advancedQueries from '../middlewares/advancedQueries.js';
import User from '../models/User.js';
const router = express.Router();

router.route('/').get(advancedQueries(User, 'user'), getUsers).post(createUser)
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser)
router.route('/:id/addaccount').post(userAddAccount)

export default router