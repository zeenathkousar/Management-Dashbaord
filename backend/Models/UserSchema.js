import mongoose from "mongoose";
import validator from "validator";

const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"First Name must contain atleast 3 characters!"]
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"Last Name must contain atleast 3 characters!"]
    },
    email:{
        type:String,
        required:true,
        validate: [validator.isEmail,"Please Enter a Valid Email"]
    },
    phone:{
        type:String,
        required:true,
        minLength:[11,"Phone Number must contain exact 11 Digits"],
      maxLength:[11,"Phone Number must contain exact 11 Digits"]
    },
    nic:{
        type:String,
        required:true,
        minLength:[13,"nic must contain exact 13 digits"],
        maxLength:[13,"nic must contain exact 13 digits"],

    },


})

export const usermodel=mongoose.model('UserCollection',userSchema)