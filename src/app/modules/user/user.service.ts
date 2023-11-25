import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUserIntoDB = async(userData:TUser)=>{
    const result = await UserModel.create(userData)
    return result;
}

const getUsersFromDB = async()=>{
    const result = await UserModel.find({}, {_id: 0, userId: 0, password: 0, 'fullName._id': 0, isActive: 0, hobbies: 0, 'address._id': 0, orders: 0, __v: 0});
    return result;
}

export const UserServices = {
    createUserIntoDB,
    getUsersFromDB,
}