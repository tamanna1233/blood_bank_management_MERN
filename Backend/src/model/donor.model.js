import {Schema, SchemaType} from 'mongoose'
const donorSchema= new Schema({
 name:{
    type:String,
    required:true
 },
 age:{
    type:Number
 },
email:{
    type :String,
    required:true
},
phone:{
    type:String,
    required:true
},

location:{
    type : Schema.ObjectId.locationSchema ,
    ref :"Location"
},

donationHistory:{
    type: Schema.Types.donationHistory,
    ref:""
},
bloodType:{
    type:String,
    required:true

}

}
,{
timestamps:true
})