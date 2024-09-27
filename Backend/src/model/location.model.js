import { model, Schema } from "mongoose";

const locationSchema= new Schema({
 type :{
    type:String,
    default: "point"
 },
 coordinates:{
    type:Number,
    required:true

 }
},
    {
        timestamps:true

})
locationSchema.index({coordinates:"2dsphere"})
export const Location= model("Location",locationSchema)