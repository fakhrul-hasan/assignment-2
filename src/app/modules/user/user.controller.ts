import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createUser = async(req:Request, res:Response)=>{
    try{
        const user = req.body.user;
    const result = await UserServices.createUserIntoDB(user)
    res.status(200).json({
        success: true,
        message: 'User created successfully',
        data: result,
    })
    }catch(err:any){
        res.status(500).json({
            success: false,
            message: err.message,
            data: err,
        })
    }
}

const getUsers = async(req:Request, res:Response)=>{
    try{
    const result = await UserServices.getUsersFromDB()
    res.status(200).json({
        success: true,
        message: 'Users fetched successfully',
        data: result,
    })
    }catch(err:any){
        res.status(500).json({
            success: false,
            message: err.message,
            data: err,
        })
    }
}

export const UserController = {
    createUser,
    getUsers,
}