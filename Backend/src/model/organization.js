import { model, Schema,SchemaType } from "mongoose";
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
<<<<<<< HEAD
        type: ,
        required:true,
    },
    donationRequest:{
        type: ,
        required:true,
    }
})
=======
        type: "",
        required:true,
    },
    donationRequest:{
        type:""  ,
        required:true,
    }
})
export const Orgainzation=model("Orgainzation",organizationSchema)
>>>>>>> f962ba1eb61eb6584a7a9adbc685239ceb907d83
