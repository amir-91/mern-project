import express from 'express'

import { authUser, getUserProfile, registerUser, updateUserProfile } from '../controller/userController.js'

const router = express.Router()

router.post('/login', authUser)
router.route('/profile').get(getUserProfile).put(updateUserProfile)
router.route('/').post(registerUser)


export default router