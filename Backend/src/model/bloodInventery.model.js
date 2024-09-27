import { model, Schema } from "mongoose";

 const bloodInventorySchema= new Schema({
A_pos :{
    type:Number,
    default:0
},
A_neg:{
    type:Number,
    default:0,
},
B_pos:{
type:Number,
default:0
},
B_Neg:{
    type:Number,
    default:0
},
O_pos:{
    type:Number,
    default:0
},
O_Neg:{
    type:Number,
    default:0
},
AB_post:{
    type:Number,
    default:0
}

 },
 {
    timestamps:true

 })
 export const BloodInvetery =model("BloodInvetery",bloodInventorySchema)