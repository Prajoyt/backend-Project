import {asyncHandler} from "../utils/asyncHandler.js"

const registerUser=asyncHandler(async(req,res)=>{
     res.status(200).json({
        message:'Hi welcome we have registered a user'
    })
})

export {registerUser};