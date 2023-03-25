import express from 'express'
import { createUser } from '../controllers/userController.js';
import User from '../models/User.js'

const router = express.Router();

router.route('/').post(createUser)

export default router