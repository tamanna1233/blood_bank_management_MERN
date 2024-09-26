import { Schema } from "mongoose";

 const donationHistorySchema=new Schema({
donorId:{
    type:String,
    required:true,

},
donationDate:{
    
}
 },
 {timestamps:true})