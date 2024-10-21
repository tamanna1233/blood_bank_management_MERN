import { Location } from '../model/location.model.js'
import {Orgainzation} from '../model/organization.js'
import { apiError } from '../utils/apiError.js'
import { apiResponse } from '../utils/apiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const organisationRegister =asyncHandler(async(req,res)=>{
    const {organizationName,location,headName,phoneno} =req.body;

    // fields are required
    if (!organizationName || !location || !headName || !phoneno) {
       throw new apiError(400,"Please fill in all fields");
       }
    // check if user is already registered
    const existingOrganization = await Orgainzation.findOne({ phoneno });
    if (existingOrganization){
        throw new apiError(400,"user already registered with this phone no");
    }

    // create of find the location document 
    let locationId;
    const existingLocation =await Location.findOne({address:location});
    if(existingLocation){
        locationId=existingLocation._id
        }
        else{
        console.log("Creating new location with Address:",location);
    const newLocation = new Location({
        address:location
    });
    const savedLocation= await newLocation.save();
    locationId = savedLocation._id;
    }


    // create the organization
    const newOrganization = new Orgainzation({
        orgainzationName:organizationName,
        location:locationId,
        // address,
        headName,
        phoneno
    });
    const savedOrganization = await newOrganization.save();
    if(!savedOrganization){
        throw new apiError(500,"Error creating new organization")
    }
    return res.status(201).json(new apiResponse(201,{organization:savedOrganization},"organization is successfully registered"));


    })
    export {organisationRegister}