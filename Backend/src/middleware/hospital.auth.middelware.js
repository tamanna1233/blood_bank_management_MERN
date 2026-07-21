import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Hospital } from "../model/hospital.model.js";
import jwt from 'jsonwebtoken';

export const verifyJwt = asyncHandler(async(req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');
  
    if (!token) {
      throw new apiError(401, 'Unauthorized request');
    }
   
    const decodedTokenInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await Hospital.findById(decodedTokenInfo?._id).select('-password -refreshToken');
    
    if (!user) {
      throw new apiError(401, 'Invalid access token');
    }
    
    req.user = user;
    req.userRole = 'hospital'; // explicitly setting for workflow controller
    next();
  } catch (error) {
    throw new apiError(401, error?.message || 'Unauthorized request');
  }
});
