import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiErrors} from "../utils/ApiErrors.js";
import {User} from "../models/user.model.js"
const registerUser=asyncHandler(async(req,res)=>{
    const{fullName,email,username,password}=req.body;
    //validation
    if(
        [fullName,email,username,password].some((field)=>field?.trim()==="")
    ){
        throw new ApiErrors(400,"All fields are r");

    }


})
export {registerUser}