import express from 'express'
import dotenv from 'dotenv'
import { verifyToken } from '../util/verify';
import { createRecord, deleteRecord, getRecords, updateStatus } from '../controller/foodWasteController';
dotenv.config()
const foodwasteAPI = express()

foodwasteAPI.post('/food-waste', verifyToken , createRecord);
foodwasteAPI.get('/food-waste', verifyToken , getRecords);
foodwasteAPI.put('/food-waste/:id/status', verifyToken , updateStatus);
foodwasteAPI.delete('/food-waste', verifyToken , deleteRecord);


export default foodwasteAPI