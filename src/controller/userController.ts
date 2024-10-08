/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import userSchema from "../models/userSchema";
import { IUser } from "../util/interface";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req: any, res: any) => {
    try {
        const { profile } = req.body;
        const params:IUser = req.body

        if (!params.email || !params.username) {
          return res.status(400).json({ error: 'First name, and last name are required' });
        }
      
        const user:IUser | null = await userSchema.findOne({email: params.email, username: params.username})

      if(user){
        return res.status(400).json({ error: 'User Already Exist' });
      }
      const password = params.password ? params.password.toString() : 'password';
      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = await userSchema.create({
        username:params.username,
        email: params.email,
        firstName: params.firstName,
        middleName: params.middleName,
        lastName: params.lastName,
        role: params.role,
        password: hashedPassword,
        profile: profile ? profile : null,
        status: 'PENDING'
      })
      res.status(200).send({newUser})

    } catch (error: any) {
        console.log(error.message)
        res.status(400).send({message:"Invalid Data or Email Already Taken"})
    }
}

export const login = async (req: any, res: any) => {
  try {
      const params:any = req.body
      const user:IUser | null = await userSchema.findOne({ email: params.email })
      if(user){
          if(user.status != 'APPROVED'){
            return res.status(400).send({ok:false, data:"Account need Admin Approval" })
          }
          const isMatch = await bcrypt.compare(params.password, user.password.toString())
          if(isMatch){
              const payload = {
                  id: user._id,
                  role: user.role,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  middleName: user.middleName
              };
              jwt.sign(
                  payload,
                  `${process.env.JWT_SECRET}`,
                  { expiresIn: "12hr" },
                  async (err, token) => {
                      if(err){
                          res.status(400).send({message: err.message})
                      }else{
                          res.status(200).send({token: token})
                      }
                  }
              )  
          }else{
              res.status(400).send({ok:false, data:"Incorrect Email or Password" })
          }
      }else{
          res.status(400).send({message:"Incorrect Email or Password" })
      }
  } catch (error: any) {
      console.log(error.message)
      res.status(400).send({message:"Invalid Data or Email Already Taken"})
  }
}

export const getUsers = async (req: any, res: any) => {
    try {
        const {user} = req;
        const users:IUser[] = await userSchema.find({
          _id : {
            $ne: new mongoose.Types.ObjectId(user.id)
          }
        }).select('-password');
        res.status(200).send(JSON.stringify(users))
    } catch (error: any) {
        console.log(error.message)
        res.status(400).send({message:"Invalid Data or Email Already Taken"})
    }
}

export const updateUserStatus = async (req: any, res: any) => {
  try {
      const {_id, status} = req.body;
      const {user} = req;
      if(user.role == 'ADMIN'){
        if(_id && status){
            const updatedUser = await userSchema.updateOne(
              { _id: new mongoose.Types.ObjectId(_id) },
              { status: status.toUpperCase() }
            );
          res.status(200).send(JSON.stringify(updatedUser))
        }else{
          res.status(400).send({message:"User and Status are Required"})
        }
      }else{
        res.status(403).send({message:"Forbidden"})
      }
  } catch (error: any) {
      console.log(error.message)
      res.status(400).send({message:"Invalid Data"})
  }
}

export const deleteUser = async (req: any, res: any) => {
  try {
      const {_id} = req.body;
      const {user} = req;
      if(user.role == 'ADMIN'){
        if(_id){
          const updatedUser = await userSchema.deleteOne(
            { _id: new mongoose.Types.ObjectId(_id) }
          );
          res.status(200).send(JSON.stringify(updatedUser))
        }else{
          res.status(400).send({message:"User ID are Required"})
        }
      }else{
        res.status(403).send({message:"Forbidden"})
      }
  } catch (error: any) {
      console.log(error.message)
      res.status(400).send({message:"Invalid Data"})
  }
}

export const getUserSetting = async (req: any, res: any) => {
  try {
      const {user} = req;
      const data:IUser = await userSchema.findOne({
        _id : new mongoose.Types.ObjectId(user.id)
      }).select('-password');
      res.status(200).send(JSON.stringify(data))
  } catch (error: any) {
      console.log(error.message)
      res.status(400).send({message:"Invalid Data or Email Already Taken"})
  }
}

export const updateUserSettings = async (req: any, res: any) => {
    try {
        const { user } = req;
        const { username, email, firstName, lastName, middleName, currentPassword, newPassword } = req.body;
        const updateData: Partial<IUser> = {
            username,
            email,
            firstName,
            lastName,
            middleName,
        };

        // Find the user
        const foundUser = await userSchema.findById(user.id).select('+password'); // Include password to compare

        if(foundUser){
            if (newPassword && foundUser) {
              const isMatch = await bcrypt.compare(currentPassword, foundUser.password); // Ensure this method exists in your schema

              if (!isMatch) {
                  return res.status(400).json({ message: "Current password is incorrect" });
              }

              updateData.password = await bcrypt.hash(newPassword, 10)
          }

          // Update user settings
          const updatedUser = await userSchema.findByIdAndUpdate(foundUser.id, updateData).select('-password');

          res.status(200).json(updatedUser);
        }
    } catch (error: any) {
        console.log(error.message);
        res.status(400).json({ message: "Invalid data" });
    }
};
