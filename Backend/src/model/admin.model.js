import { model, Schema } from "mongoose";

const adminSchema= new Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        
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
    export const Admin=model("Admin",adminSchema)