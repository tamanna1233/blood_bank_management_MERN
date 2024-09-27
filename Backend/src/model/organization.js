import { model, Schema,SchemaType } from "mongoose";
const organizationSchema= new Schema({

    name:{
        type:String,
    required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phoneno :{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    location:{
        type:Schema.Types.ObjectId,
        ref :'Location',

    },
    bloodInventory:{
        type:Schema.Types.ObjectId ,
        ref:'BloodInvetery'
    },
    donationRequest:{
        type:Schema.Types.ObjectId ,
        ref:'DonationRequest'
    }
})
export const Orgainzation=model("Orgainzation",organizationSchema)
