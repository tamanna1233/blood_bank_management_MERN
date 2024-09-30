import { model, Schema } from "mongoose";

const patientSchmea=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    gneder:{type:String,required:true},
    phone_no:{type:Number,required:true},
    age:{type:Number,required:true},
    bloodtype:{type:String,required:true},
    location:{
        type:Schema.Types.ObjectId,
        ref:"Location"
    },
    matchingDonor:{type:Schema.Types.ObjectId,ref:"Donor"}

},{timestamps:true})
export const Patient=model("Patient",patientSchmea)