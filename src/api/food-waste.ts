import express from 'express'
import dotenv from 'dotenv'
import { verifyToken } from '../util/verify';
import { createRecord, getRecords, updateStatus } from '../controller/foodWasteController';
dotenv.config()
const foodwasteAPI = express()

foodwasteAPI.post('/food-waste', verifyToken , createRecord);
foodwasteAPI.get('/food-waste', verifyToken , getRecords);
foodwasteAPI.put('/food-waste/:id/status', verifyToken , updateStatus);


export default foodwasteAPI