import { sendOtp } from "../middleware/nodemailer.midddleware"
import { Patient } from "../model/patientschema.model"
import {asyncHandler,apiError,apiRespone} from "../utils"
const login=asyncHandler(async(req,res)=>{
     const {email}=req.body
     if(!email){
        throw new apiError(400,"email required")
     }
   let patient= await Patient.findOne({email})
   if(email){
      throw new apiError(400,"email already register")
   }
   patient = new patient({email})
   await patient.save()


   const send= await sendOtp(email)
if (!send) {
   throw new apiError(400,"otp not send ")
}
   res.status(200)
   .json(new apiRespone(200,{},"otp send sucessfullly"))
     
})

const verifyOtp=asyncHandler(async(req,res)=>{
   const {email,otp}=req.body

if(!(email&&opt)){
    throw new apiError(400,"email and otp required")
}
  const data= await verifyOtp(email,otp)


})