import { model, Schema } from "mongoose";

const requestmangementSchema= new Schema({
 donor :{
    type : Schema.Types.ObjectId,
    ref:"Donor"
 },
 organization:{
    type:Schema.Types.ObjectId,
    ref:"Organization"
 },
 status:{
    type:String,
    enum :["pending", "complete","cancel"]
 }

},
{timestamps:true})

export const Requestmangement= model("Requestmangement",requestmangementSchema)