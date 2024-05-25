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

export const login=catchAsyncErrors(async(req,res,next)=>{

    const {email,password,confirmPassword,role}=req.body;
    console.log(req.body);
    if(!email || !password || confirmPassword || !role){
        console.log('provide all detials')
        return next(new ErrorHandler("Please Provide All Details!!",400));
    }
    if(password!==confirmPassword){
        return next(new ErrorHandler("Password and Confirm Password do not match!!",400));
    }
    const user=await usermodel.Find({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Password or Email",400))
    }
    const isPasswordMatched= await usermodel.comparePassword(password);
    if(!isPasswordMatched){
            return next(new ErrorHandler("Invalid Password or Email",400))
    }
    if(role!== user.role){
        return next(new ErrorHandler("User with this role is not found",400))
    }
    res.status(200).json({
        success:true,
        message:"User Logged In Successfully!!"
    })
    
})