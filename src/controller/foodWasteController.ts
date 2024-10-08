/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import userSchema from "../models/userSchema";
import { IFoodWaste, IUser } from "../util/interface";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import FoodWaste from "../models/foodWasteSchema";
import { emitNotification } from "../util/socket";

export const createRecord = async (req: any, res: any) => {
    try {
        const {user, body} = req;
        const newFoodWaste = new FoodWaste({...body,userId:user.id});

        await newFoodWaste.save();
        return res.status(200).json({
            message: 'Food waste record created successfully',
            data: newFoodWaste,
        });
    } catch (error:any) {
        console.error(error);
        return res.status(500).json({
            message: 'An error occurred while creating the food waste record',
            error: error.message,
        });
    }
};

export const getRecords = async (req: any, res: any) => {
    try {
        const foodWasteRecords = await FoodWaste.find()
        .populate({
            path: 'userId', 
            select: '-password', 
        });

        // Respond with the records
        return res.status(200).json({
            message: 'Food waste records fetched successfully',
            data: foodWasteRecords,
        });
    } catch (error:any) {
        console.error(error);
        return res.status(500).json({
            message: 'An error occurred while fetching food waste records',
            error: error.message,
        });
    }
};

export const updateStatus = async (req: any, res: any) => {
    const { id } = req.params; 
    const { status } = req.body; 
    const { user } = req;
    if(user.role != 'ADMIN'){
        return res.status(400).json({
            message: 'You are not authorized to perform this action',
        });
    }
    try {
        if (!status || !['PENDING', 'APPROVED', 'DECLINED'].includes(status)) {
            return res.status(400).json({
                message: 'Invalid status value. Must be one of PENDING, APPROVED, or DECLINED.',
            });
        }

        const updatedRecord = await FoodWaste.findByIdAndUpdate(
            {_id: id},
            { status },
            { new: true }
        ).populate({
            path: 'userId',
            select: '-password', 
        });

        if (!updatedRecord) {
            return res.status(404).json({
                message: 'Food waste record not found',
            });
        }
        if(status){
            await emitNotification(updatedRecord);
        }
        return res.status(200).json({
            message: 'Status updated successfully',
            data: updatedRecord,
        });
    } catch (error:any) {
        console.error(error);
        return res.status(500).json({
            message: 'An error occurred while updating the status',
            error: error.message,
        });
    }
};