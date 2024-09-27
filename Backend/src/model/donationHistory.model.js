import { Schema } from "mongoose";

 const donationHistorySchema=new Schema({
donorId:{
    type:String,
    required:true,

},
volume:{
    type:number,
    
}
 },
 {timestamps:true})