import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";


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
        minLength:[13,"NIC must contain exact 13 digits"],
        maxLength:[13,"NIC must contain exact 13 digits"],

    },
    dob:{
        type:Date,
        required:[true,"DOB is required"],

    },
    gender:{
        type:String,
        required:true,
        enum:["Male","Female"]
    },
    password:{
        type:String,
        minLength:[8,"Password must contain atleast 8 characters"],
        required:true,
        select:false,
    },
    role:{
        type:String,
        required:true,
        enum:["Admin","Pateint"]
    },
    doctorDepartment:{
        type:String
    },
    docAvtar:{
        public_id:String,
        url:String,
    }


});
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password=await bcrypt.hash(this.password,10)
});


userSchema.methods.comparePassword=async function(enteredPassword){
        return await bcrypt.compare(enteredPassword,this.password)
}
userSchema.methods.generateJsonWebToken=function(){
        return jwt.sign({id: this._id}, process.env.JWT_SECRETKEY,{
            expiresIn : process.env.JWT_EXPIRES,
        })
}
export const usermodel=mongoose.model('UserCollection',userSchema)