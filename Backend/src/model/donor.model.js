import {model, Schema, SchemaType} from 'mongoose'
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
    type : Schema.Types.ObjectId,
    ref :"Location"
},

donationHistory:{
    type: Schema.Types.ObjectId,
    ref:"DonationHistory"
},
bloodType:{
    type:String,
    required:true

},
healthInfo :{
    type :String,
    required:true
},
lastDonation:{
 type:Date,
 required:true
},
eligbleForDonation:{
    type:Boolean,
},
password:{
    type:String,
    required:true,
}

}
,{
timestamps:true
})
export const Donor = model("Donor",)