import { apiError } from "./apiError.js";
import crypto from "crypto"
import {Patient} from "../model/patientschema.model.js"
import nodemailerConifig from "./nodemailler.js";
export const sendOtp =async(email)=>{
  console.log(email)
  if(!email){
    throw new apiError(400,"email required")
  }

  const otp =  crypto.randomInt(1000,9000).toString()
  const otpExpire=Date.now()+15*60*1000
  const patient= await Patient.findOne({email})
  if (!patient) {
    throw new apiError(400,"patient not found")
    
  }
  patient.otp=otp
  patient.otpExpire=otpExpire
 await  patient.save()
 const mailopton={
    from:process.env.EMAIL,
    to:email,
    subject:"your otp code",
    text:`you one timme password id ${otp} is valid for 15 mins `,
    html: `<h1>Your OTP Code</h1>
    <p>Your one-time password is <strong>${otp}</strong>. It is valid for <strong>15 minutes</strong>.</p>`

 }
 try {
  
   await nodemailerConifig.sendMail(mailopton)
   return "email send scessufully"
 } catch (error) {
  throw apiError(400,"email not sent ")
 }

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
        throw new apiError(400,"invaild otp")
    }
    if(patient.otpExpire<Date.now()){
        throw new apiError(401,"your otp expire ")
    }

    patient.otp=undefined
    patient.otpExpire=undefined
    await patient.save()

    return
}