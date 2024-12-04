import mongoose, { Schema, model } from "mongoose";
import { Iimg, Inotification, IUser } from "../util/interface";

// Profile Schema
const profileSchema = new Schema<Iimg>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Self-reference for user
    },
    imageType: { type: String },
    path: { type: String },
    name: { type: String },
    fullPath: { type: String },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// User Schema
const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String }, // Not required, can be null
    password: { type: String, required: false }, // Optional field
    email: { type: String, required: true },
    
    // Fixed `role` with enum
    role: {
      type: String,
      enum: ['ADMIN', 'CONTRIBUTOR'], // Specify possible values
      required: true, // Required field
    },

    // Fixed `status` with enum
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'DECLINED'], // Status of user
      required: true,
    },
    
    foodWaste: [{ type: Schema.Types.ObjectId, ref: 'FoodWaste' }], // Reference to FoodWaste schema

    // Embedded profile schema
    profile: {
      type: profileSchema,
      required: false, // Optional profile schema
    },
  },
  {
    timestamps: true, // Automatically manage timestamps
  }
);

// Export the User model
export default model<IUser>("User", userSchema);
