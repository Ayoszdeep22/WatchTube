import { ApiResponse } from "../utils/ApiRespones.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const healtCheck=asyncHandler(async(req,res)=>{
    return res
    .status(200)
    .json(new ApiResponse(200,"OK","HealthCheckPassed"))

    


})
export{healtCheck}


    
