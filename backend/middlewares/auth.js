import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMidleware.js";
import jwt from "jsonwebtoken";
import { usermodel } from "../Models/UserSchema.js";

export const isAdminAuthenticated=catchAsyncErrors(async (req,res,next)=>{
    const token=req.cookies.adminToken;
    if(!token){
        return next(new ErrorHandler("Admin not authenticated!",400))
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRETKEY); //verifying whether we only generated it or someone else.
    req.user=await usermodel.findById(decoded.id);
     //decoded - will get payload -id from jwt.sign method mentioned  of userschema.js
     //till the above code , we call as authentication , the below is authorization
    if(req.user.role !== 'Admin'){ //authorization
        return next(new ErrorHandler(`${req.user.role} is not authorized for this resource!`,403));
    }
    next();
})

export const isPatientAuthenticated =catchAsyncErrors(async (req,res,next)=>{
    const token=req.cookies.patientToken;
    if(!token){
        return next(new ErrorHandler("User/Patient not authenticated!",400))
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRETKEY); //verifying whether we only generated it or someone else.
    req.user=await usermodel.findById(decoded.id);
    if(req.user.role !== 'Patient'){ //authorization
        return next(new ErrorHandler(`${req.user.role} is not authorized for this resource!`,403));
    }
    next();
})

