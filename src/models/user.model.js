
import mongoose ,{Schema} from "mongoose";
const UserSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        index:true
            

    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
        

    },
    avatar:{
        type:String,
        required:true
    },
     coverImage:{
        type:String,
        
    },
    watchHistory:[{
        type:Schema.Types.ObjectId,
        ref:"Video"
    }],
     password:{
        type:String,
        required:[true,"password is required"]
     },
     refreshToken:{
        type:String,
        required:[true,"password is required"]
     }


},{timestamps:true}
)
export const User=mongoose.model("User",UserSchema)
