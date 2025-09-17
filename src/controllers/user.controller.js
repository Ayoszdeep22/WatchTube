    import { asyncHandler } from "../utils/asyncHandler.js";
    import {ApiErrors} from "../utils/ApiErrors.js";
    import {User} from "../models/user.model.js"
    import { uploadToCloudinary ,deleteFromCloudinary} from "../utils/cloudinary.js";
    import { ApiResponse } from "../utils/ApiResponses.js";
import { log } from "console";

    const registerUser=asyncHandler(async(req,res)=>{
        console.log("Request body:", req.body);
        console.log("Request files:", req.files);
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
        const localPath=req.files?.avatar?.[0]?.path
        const coverPath=req.files?.coverImage?.[0]?.path
        if(!localPath){
            throw new ApiErrors(409,"Avatar image is missing");

        }
                let coverImage;
    if(coverPath){
            coverImage = await uploadToCloudinary(coverPath)
        }
    const avatar = await uploadToCloudinary(localPath);
    if (!avatar) {
        throw new ApiErrors(400, "Error uploading avatar image");
    }
    try {
        const user = await User.create({
            fullName, 
            coverImage: coverImage?.url || "",
            avatar: avatar.url,
            email,
            password,
            username: username.toLowerCase()
        })  
        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )
        if(!createdUser){
            throw new ApiErrors(500, "Something went wrong while creating user");
        }
        return res.status(201).json(new ApiResponse(201, createdUser, "User created successfully"))
    
    } catch (error) {
        log("Error during user creation, cleaning up uploaded images:", error);
        if(avatar?.public_id){
            await deleteFromCloudinary(avatar.public_id)
        }
        if(coverImage?.public_id){
            await deleteFromCloudinary(coverImage.public_id)
        }
        throw error;
            
        
    }



    })
    export {registerUser}