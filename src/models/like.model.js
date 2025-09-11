import mongoose,{Schema} from "mongoose";
const likeSchema=new Schema({
        comment:{
            type:Schema.types.ObjectId,
            ref:"comment"
        },
        video: {
            type:Schema.types.ObjectId,
            ref:"Video"
        },
         tweet:{
            type:Schema.types.ObjectId,
            ref:"Tweet"
        },
        likedBy:{
            type:Schema.types.ObjectId,
            ref:"User"
        }

    

},{timestamps:true})
export const Like=mongoose.model("Like",likeSchema);