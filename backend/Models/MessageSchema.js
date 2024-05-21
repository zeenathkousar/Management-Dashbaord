import mongoose from "mongoose";
import validator from "validator";

const messageSchema=new mongoose.Schema({
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
    Email:{
        type:String,
        required:true,
        validate: [validator.isEmail,"Please Enter a Valid Email"]
    },
    Phone:{
        type:String,
        required:true,
        minLength:[11,"Phone Number must contain exact 11 Digits"],
      maxLength:[11,"Phone Number must contain exact 11 Digits"]
    },
    message:{
        type:String,
        required:true,
        minLength:[10,"Message must contain atleast 10 characters!"],
    },

})

export const Message=mongoose.model('collectionMessage',messageSchema)