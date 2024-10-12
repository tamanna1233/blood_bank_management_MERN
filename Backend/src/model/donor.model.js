import {model, Schema, SchemaType} from 'mongoose'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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
password:{
    type:String,
    required:true
}

// healthInfo :{
//     type :String,
//     required:true
// },
// lastDonation:{
//  type:Date,
//  required:true
// },
// eligbleForDonation:{
//     type:Boolean,
// },
// password:{
//     type:String,
//     required:true,
// }

}
,{
timestamps:true
})
donorSchema.pre("save",async function(next) {
    if(!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password,10)
    next()
}) 
donorSchema.methods.isPasswordcorrect=async function(password) {
   return await bcrypt.compare(password,this.password)

}

donorSchema.methods.generateAccessToken=function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
    )
    }
    donorSchema.methods.generateRefreshToken=function(){
        return jwt.sign({
            _id:this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
        )
    }
export const Donor = model("Donor",donorSchema)