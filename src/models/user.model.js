
import mongoose ,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
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
    UserSchema.pre("save",async function(next) {
        if(!this.isModified("password"))return next();

        this.password=bcrypt.hash(this.password,10)
        next();
    })
// comparing the passwords
UserSchema.methods.isPasswordValid=async function (password) {
    return await bcrypt.compare(password,this.password)
    
}
UserSchema.methods.genearateAccessToken=function(){
   return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.email,
        },
         process.env.ACCESS_TOKEN_SECRET,
         {expiresIn:process.env.ACCESS_TOKEN_EXPIRES}
        );
}

UserSchema.methods.genearateRefreshToken=function(){
    return jwt.sign({
        _id:this._id

    },
     process.env.REFRESH_TOKEN_SECRET,
         {expiresIn:process.env.REFRESH_TOKEN_EXPIRES}
);

}






export const User=mongoose.model("User",UserSchema)
