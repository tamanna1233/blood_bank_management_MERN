import { Schema ,SchemaType } from "mongoose";
const donationRequestSchema =new Schema({
    Date:
    {
        type:Date,
        required:true,
    },
    requestedBloodType:
    {
        type:String,
         required:true,
    },
    donor:
    {
        type:Schema.Types.ObjectId,
        ref:'Donor',
        required:true,
    },
    status:
    {
        type:String,
        enum:['pending','cancel','confirmed']
    },


})
export const DonationRequest = model('DonationRequest',donationRequestSchema)