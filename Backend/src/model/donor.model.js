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

address:{
    type :String,
    required:true
},
donationHistory:{
    type: Schema.Types.donationHistory,
    ref:""
}

}
,{
timestamps:true
})