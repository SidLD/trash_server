import express from 'express'
import dotenv from 'dotenv'
import {  deleteUser, getUsers, login, register, updateUserStatus } from '../controller/userController';
import { verifyToken } from '../util/verify';
dotenv.config()
const userAPI = express()

userAPI.post('/register', register);
userAPI.post('/login', login);
userAPI.get('/users', verifyToken ,getUsers);
userAPI.delete('/user', verifyToken , deleteUser);
userAPI.put('/user/status', verifyToken, updateUserStatus);


export default userAPI