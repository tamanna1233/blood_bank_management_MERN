import { model, Schema } from "mongoose";
import jwt from "jsonwebtoken"

const patientSchmea=new Schema({
    name:{type:String},
    email:{type:String,required:true, unique:true},
    age:{type:Number},
    bloodtype:{type:String},
    location:{
        type:Schema.Types.ObjectId,
        ref:"Location"
    },
    matchingDonor:{type:Schema.Types.ObjectId,ref:"Donor"},
    otp:{type:Number},
    otpExpire:{type:String},

    refreshToken:{type:String}

},{timestamps:true})

patientSchmea.methods.generateAccessToken=function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
    )
    }
    patientSchmea.methods.generateRefreshToken=function(){
        return jwt.sign({
            _id:this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
        )
    }
export const Patient=model("Patient",patientSchmea)