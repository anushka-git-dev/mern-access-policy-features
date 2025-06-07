import express from 'express';
import { getUsers, saveUser, loginUser } from '../controllers/userController.js';
import { ipWhitelist } from '../middlewares/ipWhitelist.js';
import { deviceCompliance } from '../middlewares/deviceCompliance.js';

const userRouter = express.Router();

userRouter.get('/', getUsers);   
userRouter.post('/', saveUser);
userRouter.post('/login', ipWhitelist, deviceCompliance, loginUser);

export default userRouter;