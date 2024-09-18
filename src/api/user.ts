import express from 'express'
import dotenv from 'dotenv'
import {  getUsers, register, updateUserStatus } from '../controller/userController';
import { verifyToken } from '../util/verify';
dotenv.config()
const userAPI = express()

userAPI.post('/register', register);
userAPI.post('/login', register);
userAPI.get('/users', verifyToken ,getUsers);
userAPI.put('/user/status', verifyToken, updateUserStatus);


export default userAPI