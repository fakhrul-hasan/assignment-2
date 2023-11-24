import { Schema } from "mongoose";
import { TAddress, TFullName, TProduct, TUser } from "./user.interface";

const fullNameSchema = new Schema<TFullName>({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        maxlength: [20, 'First name cannot be more than 20 characters'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        maxlength: [20, 'Last name cannot be more than 20 characters'],
    }
})

const addressSchema = new Schema<TAddress>({
    street: {
        type: String,
    },
    city: {
        type: String,
        required: [true, 'City is required'],
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
    }
})

const productSchema = new Schema<TProduct>({
    productName: {
        type: String,
        required: [true, 'Product name is quired']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [1, 'Price must be greater than 0']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be greater than 0']
    }
})

const user = new Schema<TUser>({
    userId: {
        type: Number,
        required: [true, 'UserId is required'],
        unique: true
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        maxlength: [20, 'Password cannot be more than 20 characters'],
        minlength: [5, 'Password cannot be less than 5 characters']
    },
    fullName: {
        type: fullNameSchema
    },
    age:{
        type: Number,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    hobbies:{
        type: [String],
    },
    address:{
        type: addressSchema,
    },
    orders: {
        type: [productSchema],
    }
})