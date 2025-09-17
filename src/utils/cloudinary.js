import { v2 as cloudinary } from 'cloudinary';
import { log } from 'console';
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
   // Configuration
    cloudinary.config({ 
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });
    const uploadToCloudinary = async (localfilePath) => {
        try {
            if(!localfilePath) return null;
            const response =await cloudinary.uploader.upload(
                localfilePath,{resource_type:"auto",}
            )
            console.log("file uploaded on lcoudinary "+response.url);
            // if file is laoded we need to delete it from the local server
            fs.unlinkSync(localfilePath);
            return response;            
            
        } catch (error) {
            console.error("Cloudinary upload error:", error);
            if (fs.existsSync(localfilePath)) {
                fs.unlinkSync(localfilePath);
            }
            throw new Error(error?.message || "Error uploading file");
        }
    }
    const deleteFromCloudinary=async(publicId)=>{
        try {
           const reqids= await cloudinary.uploader.destroy(publicId);
           log("file deleted from cloudinary",reqids);
            
        } catch (error) {
            console.error("Cloudinary deletion error:", error);
            throw new Error(error?.message || "Error deleting file");
            
        }
    }   
    export {uploadToCloudinary,deleteFromCloudinary}