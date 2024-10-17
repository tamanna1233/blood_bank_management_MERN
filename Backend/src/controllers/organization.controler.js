import { Location } from '../model/location.model.js'
import {Orgainzation} from '../model/organization.js'
import { apiError } from '../utils/apiError'
import { apiResponse } from '../utils/apiResponse'
import { asyncHandler } from '../utils/asyncHandler'
const generateAccessTokenAndRefreshToken =async(userID)=>{
    try {
        const organization= await Orgainzation.findById(userID)
        const accessToken =Orgainzation.generateAccessToken()
        const refreshToken=Orgainzation.generateRefreshToken()
        organization.refreshToken=refreshToken

        await Orgainzation.Save({validateBeforeSave:false})
        return {accessToken,refreshToken}
}
catch (error) {
    throw new apiError(500,error.message)

}
}
const organisationRegister =asyncHandler(async(req,res)=>{
    const {organizationName, location,headName, phoneno } =req.body;

    // fields are required
    if (!organizationName || !location || !headName || !phoneno) {
       throw new apiError(400,"Please fill in all fields");
       }
    // check if user is already registered
    const existingOrganization = await Orgainzation.findOne({ phoneno });
    if (existingOrganization){
        throw new apiError(400,"user already registered with this email");
    }

    // create of find the location document 
    let locationId;
    const existingLocation =await Location.findOne({address:location});
    if(existingLocation){
        locationId=existingLocation._id
        }
        else{
        console.log("Creating new location with Address:",location);
    const newLocation = new location({
        address:location
    });
    const savedLocation= await newLocation.save();
    locationId = savedLocation._id;
    }


    // create the organization
    const newOrganization = new Orgainzation({
        orgainzationName,
        Location:locationId,
        // address,
        headName,
        phoneno
    });
    const savedOrganization = await newOrganization.save();
    if(!savedOrganization){
        throw new apiError(500,"Error creating new organization")
    }
    return res.status(201).json(new apiResponse(201,{organization:savedOrgansization},"organization is successfully registered"));


    })
    export {organisationRegister}