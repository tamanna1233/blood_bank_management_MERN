import { model, Schema } from "mongoose";

const donationHistoryShema= new Schema({
   orgainzation:{
    type: Schema.Types.ObjectId,
    ref:"Orgainzation"
   },
   volume:{
    type :Number,
    default:0
   }
},
{
    timestamps:true
})
export const  DonationHistory=model("DonationHistory",donationHistoryShema)