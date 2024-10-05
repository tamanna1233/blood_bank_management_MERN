import { apiError } from "../utils/apiError";
import crypto from "crypto"
import {Patient} from "../model/patientschema.model"
import nodemailerConifig from "../utils/nodemailler";
export const sendOtp =async(email)=>{
  if(!email){
    throw new apiError(400,"email required")
  }

  const otp =  crypto.randomInt(1000,9000).toString()
  const otpExpire=Date.now()+15*60*1000
  const patient=Patient.findone({email})
  if (!patient) {
    throw new apiError(400,"patient not found")
    
  }
  patient.otp=otp
  patient.otpExpire=otpExpire
 await patient.save()
 const mailopton={
    from:process.env.EMAIL,
    to:email,
    subject:"your otp code",
    text:`you one timme password id ${otp} is valid for 15 mins `
 }
 await nodemailerConifig.sendMail(mailopton)

 return 
}

export const verifyotp=async(email,otp)=>{
    if(!(email && otp)){
        throw new apiError(400,"email and otp requires")
    }

    const patient=await Patient.findOne({email})
    if (!patient) {
        throw new apiError(400,"patient not found")
        
    }

    if(patient.otp!==otp){
        throw apiError(400,"invaild otp")
    }
    if(patient.otpExpire<Date.now()){
        throw new apiError(401,"your otp expire ")
    }

    patient.otp=undefined
    patient.otpExpire=undefined
    await patient.save()

    return
}