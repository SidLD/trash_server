
import mongoose, { Schema, model } from "mongoose";
import { Iimg, Inotification, IUser } from "../util/interface";


// Notification Schema
const notificationSchema = new Schema<Inotification>(
    {
        admin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        description: String,
        title: String,
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        path: String,
        isRead: {
            type: Boolean,
            default: false
        }
    },
    {
      timestamps: true, // Automatically manage timestamps
    }
  );
  
  // Export the User model
  export default model<Inotification>("Notification", notificationSchema);