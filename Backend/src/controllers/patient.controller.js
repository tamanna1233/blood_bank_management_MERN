import { sendOtp, verifyotp } from "../utils/nodemailer.otp.js";
import { Patient } from "../model/patientschema.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

// genrate access and  refresh token
const generateAccessTokenAndRefreshToken=async(userID)=>{
  try {
    const patient=  await Patient.findById(userID)
   const accessToken=  patient.generateAccessToken()
    const refreshToken=  patient.generateRefreshToken()
    patient.refreshToken=refreshToken
    

   await patient.save({validateBeforeSave:false})

   return {accessToken,refreshToken}

  } catch (error) {
     throw new apiError(500,error.message) 
  }
}

// Step 1: Send OTP for login
const login = asyncHandler(async (req, res) => {
  const { email } = req.body;


   if (!email) {
     throw new apiError(400, "Email required");
   }
 
   let patient = await Patient.findOne({ email })
   try {
    if (!patient) {
      patient = new Patient({ email });
      console.log(patient)
     await  patient.save();
     
    }
  
   } catch (error) {
    console.log(error.message)
    throw new apiError(400, error.message);
   }
   // Send OTP
   const send = await sendOtp(email);
   if (!send) {
     throw new apiError(400, "OTP not sent");
   }
 
   res.status(200).json(new apiResponse(200, {}, "OTP sent successfully"));
 
});



// Step 2: Verify OTP for login
const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!(email && otp)) {
    throw new apiError(400, "Email and OTP required");
  }

  try {
    // Verify OTP
    await verifyotp(email, otp);

    // Fetch the patient or create a session/token
    let patient = await Patient.findOne({ email });

    if (!patient) {
      throw new apiError(400, "User not found");
    }



    // You can generate a session token or proceed with login
    const { accessToken, refreshToken } = await  generateAccessTokenAndRefreshToken(patient._id);
    const loggedInUser= await Patient.findById(patient._id).select('-password -refreshToken')
 const options={
    httpOnly:true,
    secure:true
 }
 return res
 .status(200)
 .cookie('accessToken',accessToken,options)
 .cookie('refreshToken',refreshToken,options)
 .json(
    new apiResponse(200,{
        user: loggedInUser,accessToken,refreshToken,
        
    },'user logged in sucessfully')

  )  } catch (error) {
    throw  new apiError(400, error.message);
  }
});


const logout=asyncHandler(async(req,res)=>{
  await Patient.findByIdAndUpdate(
    req.user._id,
    {
        $unset:{
            refreshToken:1,
            
        }
    },
    {
        new:true
    }
)
const options={
    httpOnly:true,
    secure:true
 }
 return res.status(200)
 .clearCookie("accessToken",options)
 .clearCookie('refreshToken',options)
 .json(new apiResponse(200,{},'user logged out'))
 
})


const matchBloodGroup=asyncHandler(async(req,res)=>{
  const{name,bloodType,age,address}=req.body
})

export { login, verifyOtp,logout};
