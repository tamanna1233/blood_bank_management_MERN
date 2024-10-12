import { model, Schema } from "mongoose";

const locationSchema= new Schema({
 address:{
   type:String,  
   required:true
 }
 
},
    {
        timestamps:true

})
export const Location= model("Location",locationSchema)