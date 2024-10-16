import { Admin } from "../model/admin.model.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'
export const verifyJwt=asyncHandler(async(req,res,next)=>{
  try {
    const token=  req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ','')
  
    if(!token){
      throw new apiError(401,'unauthorized request')
    }
   

   const decodetokeninfo= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
  const user =await Admin.findById(decodetokeninfo?._id).select('-password -refreshToken')
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