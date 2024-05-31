import { Message } from "../Models/MessageSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMidleware.js";

export const sendMessage= catchAsyncErrors(async(req,res,next) =>{
    const {firstName, lastName, email,phone,message}= req.body;
    if(!firstName || !lastName || !email || !phone || !message) {
        // return res.status(400).json({
        //     success:false,
        //     message:"Please Fill All Fields in the Form"
        // });
        return next(new ErrorHandler("Please fill All fields of form!!",500))
    }

    // console.log(req.body);
    await Message.create({firstName,lastName,email,phone,message});
    res.status(200).json({
        success:true,
        message: "Message sent Succcessfully"
    })   
})

export const getAllMessages=catchAsyncErrors(async(req,res,next)=>{
    const messages=await Message.find();
    res.status(200).json({
        success:true,
        messages,
    })
})