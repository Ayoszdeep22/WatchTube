    import { asyncHandler } from "../utils/asyncHandler.js";
    import {ApiErrors} from "../utils/ApiErrors.js";
    import {User} from "../models/user.model.js"
    import { uploadToCloudinary } from "../utils/cloudinary.js";
    import { ApiResponse } from "../utils/ApiResponses.js";

    const registerUser=asyncHandler(async(req,res)=>{
        const{fullName,email,username,password}=req.body;
        //validation
        if(
            [fullName,email,username,password].some((field)=>field?.trim()==="")
        ){
            throw new ApiErrors(400,"All fields are required");

        }
        const existedUSer=await User.findOne({
            $or:[{username},{email}]
        })
        if(existedUSer){
            throw new ApiErrors(409,"Username already existed");

        }
        const localPath=req.files?.avatar[0]?.path
        const coverPath=req.files?.coverImage[0]?.path
        if(!localPath){
            throw new ApiErrors(409,"Avatar image is missing");

        }
        let coverumage=""
    if(coverPath){
            coverumage=await uploadToCloudinary(coverPath)

        }
    const vaatr=await uploadToCloudinary(localPath);
    const user=await User.create({
        fullName, 
        coverumage:coverumage?.url||"",
        vaatr:vaatr.url,
        email,
        password,
        username:username.toLowerCase()

    })
    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
    throw new ApiErrors(409,"Avatar image is missing");

        
    }
    return res.status(400).json(new ApiResponse(200,createdUser,"user create dsuccesflluy"))




    })
    export {registerUser}