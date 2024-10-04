/* eslint-disable @typescript-eslint/no-explicit-any */

import FoodWaste from "../models/foodWasteSchema";

export const getStat = async (req: any, res: any) => {
    try {
        const foodWasteRecords = await FoodWaste.find({
            status: 'APPROVED'
        })

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
