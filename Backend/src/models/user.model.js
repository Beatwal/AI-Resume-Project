import mongoose from "mongoose";
import validator from "validator"
const userSchema=new mongoose.Schema({
    googleId: {
  type: String,
  unique: true,
  sparse: true
},
    username:{
        type:String,
        unique:[true,"This username is already taken from another user"],
       sparse:true,
        trim:true
    },
    email:{
         type:String,
        unique:[true,"This email is already register!"],
        required:true,
        lowercase:true,
        validate:[validator.isEmail,"Invalid Email"]
    },
    password:{
        type:String,
        minlength:[6,"password must be at least "],
        select:false
    },
    provider:{
        type:String,
        enum:["local","google"],
        default:"local"
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    emailtoken:{
        type:String,
        default:null
    },
    emialtokenExpires:{
        type:Date
    },
    otp:{
        type:String,
        default:null
    },
    otpExpires:{
        type:Date
    }
},{timestamps:true})
const userModel=mongoose.model("users",userSchema)
export{userModel}