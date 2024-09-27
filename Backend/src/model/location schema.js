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

export const Location= model("location",locationSchema)