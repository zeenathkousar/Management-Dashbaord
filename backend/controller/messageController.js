import { Message } from "../Models/MessageSchema.js";

export const sendMessage= async(req,res,next) =>{
    const {firstName, lastName, email,phone,message}= req.body;
    if(!firstName || !lastName || !email || !phone || !message) {
        return res.status(400).json({
            success:false,
            message:"Please Fill All Fields in the Form"
        });
    }
    console.log(req.body);
    await Message.create({firstName,lastName,email,phone,message});
    res.status(200).json({
        success:true,
        message: "Message sent Succcessfully"
    })   
}