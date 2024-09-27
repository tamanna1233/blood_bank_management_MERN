import { Schema,SchemaType } from "mongoose";
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
        // required:true,

    },
    bloodInventory:{
        type:,
        required:true,
    },
    donationRequest:{
        type:  ,
        required:true,
    }
})