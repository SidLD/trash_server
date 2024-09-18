import mongoose, { Schema, model } from "mongoose";
import { Iimg, IUser } from "../util/interface";

// Profile Schema
const profileSchema = new Schema<Iimg>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    imageType: { type: String },
    path: { type: String },
    name: { type: String },
    fullPath: { type: String },
  },
  { timestamps: true }
);

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
      required: true, // Specify if it is required
    },

    // Fixed `status` with enum
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'DECLINED'], // Specify possible values
      required: true,
    },

    // Embedded profile schema
    profile: {
      type: profileSchema,
      required: false,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

export default model<IUser>("User", userSchema);
