import { asyncHandler } from '../utils/asyncHandler';
import { apiError } from '../utils/apiError';
import { apiResponse } from '../utils/apiResponse';
import {Admin} from '../model/admin.model.js'
const adminregister =asyncHandler(async(res,res)=>{
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
res.status(200)
.json(new apiResponse(201,{admin},"admin is successfully register"))
})

const login =asyncHandler(async(req,res)=>{
    
})