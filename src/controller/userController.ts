/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import userSchema from "../models/userSchema";
import { IUser, StatusType } from "../util/interface";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req: any, res: any) => {
    try {
        const { profile } = req.body;
        const params:IUser = req.body

        if (!params.email || !params.username) {
          return res.status(400).json({ error: 'First name, and last name are required' });
        }
      
        const user:IUser | null = await userSchema.findOne({email: params.email, contact: params.username})

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
        status: StatusType.PENDING
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
          const isMatch = await bcrypt.compare(params.password, user.password.toString())
          if(isMatch){
              const payload = {
                  id: user._id,
                  role: user.role,
                  firstName: user.firstName,
                  lastName: user.lastName
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
        const users = await userSchema.find({}).select('-password');
        res.status(200).send(JSON.stringify(users))
    } catch (error: any) {
        console.log(error.message)
        res.status(400).send({message:"Invalid Data or Email Already Taken"})
    }
}

export const updateUserStatus = async (req: any, res: any) => {
  try {
      const {_id, status} = req.body;

     if(_id && status){
      const data = userSchema.updateOne({ _id: new mongoose.Types.ObjectId(_id)}, {
        status: status.toUpperCase()
      })
      res.status(200).send(JSON.stringify(data))
     }else{
      res.status(400).send({message:"User and Status are Required"})
     }
  } catch (error: any) {
      console.log(error.message)
      res.status(400).send({message:"Invalid Data"})
  }
}

