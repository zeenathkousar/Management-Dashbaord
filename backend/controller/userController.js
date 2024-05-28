import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMidleware.js";
import { usermodel } from "../Models/UserSchema.js";
import { generateToken } from "../utils/jwtToken.js";


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
    generateToken(user," user Registered!",200,res)
    // res.status(200).json({
    //     success:true,
    //     message:"User Registed Successfully"
    // })

})

export const login=catchAsyncErrors(async(req,res,next)=>{

    const {email,password,confirmPassword,role}=req.body;
    console.log(req.body);
    if(!email || !password || !confirmPassword || !role){
        console.log('provide all detials')
        return next(new ErrorHandler("Please Provide All Details!!",400));
    }
    if(password!==confirmPassword){
        return next(new ErrorHandler("Password and Confirm Password do not match!!",400));
    }
    const user=await usermodel.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Password or Email",400))
    }
    console.log(`user is:${user}`)

    const isPasswordMatched= await user.comparePassword(password);
    if(!isPasswordMatched){
            return next(new ErrorHandler("Invalid Password or Email",400))
    }
    if(role!== user.role){
        return next(new ErrorHandler("User with this role is not found",400))
    }
    generateToken(user," User Login Success!",200,res)
    // res.status(200).json({
    //     success:true,
    //     message:"User Logged In Successfully!!"
    // })
    
})

export const addNewAdmin=catchAsyncErrors(async(req,res,next)=>{
    const { firstName, lastName, email, phone, password, gender, dob, nic } = req.body;
    if(!firstName || !lastName || !email||  !phone || !password|| !gender||!dob|| !nic){
        return next(new ErrorHandler("Please fill All fields of form",400))
    }
    const isRegistered= await usermodel.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} with this email already exists` ));
    }
    const admin=await usermodel.create({firstName, lastName, email, phone, password, gender, dob, nic,role:"Admin",});
    res.status(200).json({
        success:true,
        message:"New Admin Registered"
    })


})