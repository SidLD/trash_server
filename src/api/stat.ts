import express from 'express'
import dotenv from 'dotenv'
import { getStat } from '../controller/statController';
dotenv.config()
const statAPI = express()

statAPI.get('/stat' , getStat);


export default statAPI