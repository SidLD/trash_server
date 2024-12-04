import express from "express";
import { verifyToken } from "../util/verify";
import { getAllNotifications, updateNotificationStatus } from "../controller/notificationController";


const router = express.Router();


// Get all notifications
router.get("/notifications", verifyToken, getAllNotifications);

// Update `isRead` status
router.put("/notifications/:id", verifyToken, updateNotificationStatus);

export default router;
