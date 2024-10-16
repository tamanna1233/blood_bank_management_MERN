import { asyncHandler } from "../utils/asyncHandler.js";
import { Donor } from "../model/donor.model.js";
import {apiError} from "../utils/apiError.js"
import {apiResponse} from "../utils/apiResponse.js"
import { Location } from "../model/location.model.js";
const generateAccessTokenAndRefreshToken=async(userID)=>{
    try {
      const patient=  await Donor.findById(userID)
     const accessToken=  Donor.generateAccessToken()
      const refreshToken=  Donor.generateRefreshToken()
      patient.refreshToken=refreshToken
      
  
     await Donor.save({validateBeforeSave:false})
  
     return {accessToken,refreshToken}
  
    } catch (error) {
       throw new apiError(500,error.message) 
    }
  }
  const donorregister = asyncHandler(async (req, res) => {
    const { name, email, phone, age, location, bloodType, password } = req.body;
  
    // Check if all fields are provided
    if ([name, email, phone, age, location, bloodType, password].some((field) => !field || String(field).trim() === "")) {
      throw new apiError(400, "All fields are required");
    }
  
    // Check if the user is already registered
    const user = await Donor.findOne({ email });
    if (user) {
      throw new apiError(400, "User already registered with this email");
    }
  
    // Create or find the location document
    let locationId;
       const existingLocation = await Location.findOne({ address: location });
      if (existingLocation) {
        locationId = existingLocation._id; // Use existing location
      } else {
        console.log("Creating new location with address:", location);
        const newLocation = new Location({ address: location }); // You can break down the address into city, state, etc.
        const savedLocation = await newLocation.save();
        locationId = savedLocation._id; // Use new location's _id
      }
    
   

  
    // Create the donor
    const donor = new Donor({
      name,
      email,
      phone,
      age,
      location: locationId,  // Reference the location _id
     bloodType,
      password,  // Password will be hashed in the schema middleware
    });
  
    // Save the donor
    const savedDonor = await donor.save();
    if (!savedDonor) {
      throw new apiError(400, "Donor not registered");
    }
  
    return res.status(201).json(new apiResponse(201, { donor: savedDonor }, "Donor is successfully registered"));
  });
  



const login=asyncHandler(async(req,res)=>{
 const {email,password}=req.body
 if([email,password].some((flieds)=>flieds?.trim()==="")){
    throw new apiError(400,"All fields are required")
 }

 const donor=await Donor.findOne({email})
if(!donor){
    throw new apiError(400,"donor not found ")

}
 // You can generate a session token or proceed with login
 const { accessToken, refreshToken } = await  generateAccessTokenAndRefreshToken(donor._id);
 const loggedInUser= await Donor.findById(donor._id).select('-password -refreshToken')
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

const updateAccountDetail=asyncHandler(async(req,res)=>{
  const {email,phone,location,age}=req.body
  
 const user= await  Donor.findByIdAndUpdate(req.user._id,{
  $set:{
    email,
    age,
    phone,
    location
  }
 },{
  new:true
 })
  res.status(200)
  .json(new apiResponse(200,{},"user deatail updated suceessfully"))
})
const getCurrentUser=asyncHandler(async(req,res)=>{
  return res 
  .status(200)
  .json(new apiResponse(200,req.user,"current user fetched succesfully"))
})
  export{login,logout,donorregister,updateAccountDetail,getCurrentUser}