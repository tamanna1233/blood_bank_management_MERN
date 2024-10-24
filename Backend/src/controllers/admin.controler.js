import { asyncHandler } from '../utils/asyncHandler.js';
import { apiError } from '../utils/apiError.js';
import { apiResponse } from '../utils/apiResponse.js';
import {Admin} from '../model/admin.model.js'
import { Donor } from '../model/donor.model.js';
import { Orgainzation } from '../model/organization.js';

const generateAccessTokenAndRefreshToken=async(userID)=>{
    try {
      const user=  await Admin.findById(userID)
     const accessToken=  user.generateAccessToken()
      const refreshToken=  user.generateRefreshToken()
      user.refreshToken=refreshToken
      
  
     await user.save({validateBeforeSave:false})
  
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

    const {email,password}=req.body.data
   
    if(!(email&&password)){
        throw new apiError(400,"email and password required")
    }
   const user=await  Admin.findOne({email})
   if(!user){
    throw new apiError(400,"user not found")
   } 
   const role={role:"admin"}
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
       user: loggedInUser,accessToken,refreshToken,role,
       
   },'user logged in sucessfully')
  
  )  

    
})
const getCurrentUser=asyncHandler(async(req,res)=>{
    const userdata={
        user:req.user,
        role:"admin"
    }
    return res 
    .status(200)
    .json(new apiResponse(200,{userdata},"current user fetched succesfully"))
  })


  const donorList = asyncHandler(async (req, res) => {
    const donors = await Donor.aggregate([

        {$lookup:{
            from:"locations",
            localField:"location",
            foreignField:"_id",
            as:"locationdata"
        }},
        {
            $unwind: {
                path: "$locationdata",
                preserveNullAndEmptyArrays: true // Handle cases where there's no matching location
            }
        },        {
            $project: {
                name: 1,
                email: 1,
                phone: 1,
                bloodType: 1,
                address: "$locationdata.address",
               _id:1
                
            } 
            ,
        },
    ]);

    if (!donors || donors.length === 0) {
        throw new apiError(400, "Donors not found");
    }

    return res.status(200).json(new apiResponse(200, { donors }, "success"));
});

const orgainizationList=asyncHandler(async(req,res)=>{
    const orgainzationList= await Orgainzation.aggregate([
        {
            $lookup:{
            from:"locations",
            localField:"location",
            foreignField:"_id",
            as:"locationdata"
            }

        },
        {
            $unwind: {
                path: "$locationdata",
                preserveNullAndEmptyArrays: true // Handle cases where there's no matching location
            }
        },{
            $project:{
                orgainzationName:1,
                phoneno:1,
                headName:1,
                address:"$locationdata.address",
                _id:1
            }
        }

    ])
    return res.status(200).json(new apiResponse(200,{orgainzationList},"success"))
})

const logout=asyncHandler(async(req,res)=>{
    await Admin.findByIdAndUpdate(
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


export{
    adminregister,
    login,
    getCurrentUser,
    donorList,
    logout,
    orgainizationList,
}
