import mongoose ,{Schema, Types} from "mongoose";
const VideoSchema=new Schema({
    videoFile:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true,

    },
 title:{
        type:String,
        required:true,

    },
    description:{
        type:String,
        required:true,
    },
    views:{
        type:Number,
        required:true,


    },
     Duration:{
        type:Number,
        default:0


    },
   isPublished:{
        type:Boolean,
        default:true


    },
    owner:{
        type:Schema.types.ObjectId,
        ref:"User"
    },


},{timestamps:true}
)
export const Video=mongoose.model("Video",VideoSchema)