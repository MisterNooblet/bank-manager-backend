import express from 'express'
import { createUser, getUsers, getUser, updateUser, userAddAccount, deleteUser } from '../controllers/userController.js';
import userQueries from '../middlewares/userQueries.js'
const router = express.Router();

router.route('/').get(userQueries, getUsers).post(createUser)
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser)
router.route('/:id/addaccount').post(userAddAccount)

export default router