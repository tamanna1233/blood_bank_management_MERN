import { asyncHandler } from "../utils/asyncHandler.jd";
import { Donor } from "../model/donor.model.js";
import {apiError} from "../utils/apiError.js"
import {apiResponse} from "../utils/apiResponse.js"
const donorregister=asyncHandler(async(req,res)=>{

const{name,email,phone,age,location,bloodType}=req.body
if([name ,email,phone,age, location,bloodGroup,password].some((flieds)=>flieds?.trim()==="")){
    throw new apiError(400,"All fields are required")
}

const user=await Donor.findOne({email})
if(user){
    throw new apiError(400,"user already register")

}

const donor=new Donor({name,email,phone,age,location,bloodType})
donor.save()
 if(!donor){
    throw new apiError(400,"donor not register")
 }
 res.status(200)
 .josn(new apiResponse(201,{donor},"donor is succesfully register"))

})

const login=asyncHandler(async(req,res)=>{

})