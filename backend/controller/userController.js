import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMidleware.js";
import { usermodel } from "../Models/UserSchema.js";


export const patientRegister = catchAsyncErrors(async(req, res, next)=>{
    const { firstName, lastName, email, phone, password, gender, dob, nic, role } = req.body;

    if(!firstName || !lastName || !email||  !phone || !password|| !gender||!dob|| !nic|| !role){
        return next(new ErrorHandler("Please fill All fields of form",400))
    }

    let user = await usermodel.findOne({email});
    if(user){
        return next(new ErrorHandler("User Already Registered!",400))
    }

    user=await usermodel.create({ firstName, lastName, email, phone, password, gender, dob, nic, role})
    res.status(200).json({
        success:true,
        message:"User Registed Successfully"
    })

})