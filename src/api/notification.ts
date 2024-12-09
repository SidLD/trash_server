import express from "express";
import { verifyToken } from "../util/verify";
import { getAllNotifications, updateNotificationStatus } from "../controller/notificationController";


const notificatioAPI = express.Router();


// Get all notifications
notificatioAPI.get("/notifications", verifyToken, getAllNotifications);

// Update `isRead` status
notificatioAPI.put("/notifications/:id", verifyToken, updateNotificationStatus);

export default notificatioAPI;
