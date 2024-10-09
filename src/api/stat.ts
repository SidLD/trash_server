import express from 'express'
import dotenv from 'dotenv'
import { getContributorStat, getStat } from '../controller/statController';
import { verifyToken } from '../util/verify';
dotenv.config()
const statAPI = express()

statAPI.get('/stat' , getStat);
statAPI.get('/contributor/stat', verifyToken, getContributorStat);


export default statAPI