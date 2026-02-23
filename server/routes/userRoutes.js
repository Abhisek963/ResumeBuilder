import express from 'express';
import { getUserById, loginUser, getUserResumes, registerUser } from '../controllers/UserController.js';
import  protect  from '../middleware/authMiddleware.js';
import user from '../models/User.js';



const userRouter = express.Router();


userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/data', protect,getUserById)
userRouter.get('/resumes', protect,  getUserResumes)


export default userRouter
