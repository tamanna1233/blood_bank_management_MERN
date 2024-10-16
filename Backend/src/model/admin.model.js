import { model, Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const adminSchema= new Schema({

    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    
    aprovedorganization:{
        type:Schema.Types.ObjectId,
        ref:"Orgainzation"

    },
    requestmangement:{
        type:Schema.Types.ObjectId,
        ref:"Requestmangement"
    }
},
    
    
    {timestamps:true})

    adminSchema.pre("save",async function(next) {
        if(!this.isModified("password")) return next();
        this.password=await bcrypt.hash(this.password,10)
        next()
    }) 
    adminSchema.methods.isPasswordcorrect=async function(password) {
       return await bcrypt.compare(password,this.password)
    
    }
    
    adminSchema.methods.generateAccessToken=function(){
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
        adminSchema.methods.generateRefreshToken=function(){
            return jwt.sign({
                _id:this._id,
                
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn:process.env.REFRESH_TOKEN_EXPIRY
            }
            )
        }
    export const Admin=model("Admin",adminSchema)