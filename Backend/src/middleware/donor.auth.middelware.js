import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'
import { Donor } from "../model/donor.model.js";
export const verifyJwt=asyncHandler(async(req,res,next)=>{
  try {
    const token=  req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ','')
  
    if(!token){
      throw new apiError(401,'unauthorized request')
    }
   

   const decodetokeninfo= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
  const user =await Donor.findById(decodetokeninfo?._id).select('-password -refreshToken')
  if(!user){
    console.log(401,'invalid access token')
      throw new apiError(401,'invalid access token')
  }
  req.user=user
  } catch (error) {
    console.log(401,error?.message || 'unauthorized request')
    throw new apiError(401,error?.message || 'unauthorized request')
  }
next()
})