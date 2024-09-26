import {Schema} from 'mongoose'
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
}

}
,{
timestamps:true
})