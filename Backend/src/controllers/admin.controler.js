import { asyncHandler } from '../utils/asyncHandler.js';
import { apiError } from '../utils/apiError.js';
import { apiResponse } from '../utils/apiResponse.js';
import {Admin} from '../model/admin.model.js'
import { Donor } from '../model/donor.model.js';

const generateAccessTokenAndRefreshToken=async(userID)=>{
    try {
      const patient=  await Admin.findById(userID)
     const accessToken=  Admin.generateAccessToken()
      const refreshToken=  Admin.generateRefreshToken()
      patient.refreshToken=refreshToken
      
  
     await Donor.save({validateBeforeSave:false})
  
     return {accessToken,refreshToken}
  
    } catch (error) {
       throw new apiError(500,error.message) 
    }
  }

const adminregister =asyncHandler(async(req,res)=>{
    const {email,password} =req.body
    if([email,password].some((flieds)=>flieds?.trim()==="")){
    throw new apiError(400,"All fields are required");
}

const user =await Admin.findOne({email})
if(user){
    throw new apiError(400,"user already register");
    
}
const admin =new Admin({email,password})
admin.save()
if(!admin){
    throw new apiError(400,"admin not register");
    
}
 return res.status(200)
.json(new apiResponse(201,{},"admin is successfully register"))
})

const login =asyncHandler(async(req,res)=>{

    const {email,password}=req.body
    if(!(email&&password)){
        throw new apiError(400,"email and password")
    }
   const user=await  Admin.findOne({email})
   if(!user){
    throw new apiError(400,"user not found")
   } 
   const { accessToken, refreshToken } = await  generateAccessTokenAndRefreshToken(user._id);
   const loggedInUser= await Admin.findById(user._id).select('-password -refreshToken')
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
  
  )  

    
})
const getCurrentUser=asyncHandler(async(req,res)=>{
    return res 
    .status(200)
    .json(new apiResponse(200,req.user,"current user fetched succesfully"))
  })


const  donorList=asyncHandler(async(req,res)=>{
    const donor=Donor.aggregate([{$project:{
        name:1,
        email:1,
        phone:1,
        bloodType:1,
        address:"$location"
    }}])
     if (!donor) {
         throw new apiError(400,"donors not found")
     }

     return res.status(200).json(new apiResponse(200,{donor},"success"))
})

export{
    adminregister,
    login,
    getCurrentUser,
    donorList
}
