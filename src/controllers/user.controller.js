import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import{uploadOnCloudinary} from '../utils/cloudinary.js'
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
    //  res.status(200).json({
    //     message:'Hi welcome we have registered a user'
    // })
    /*
  steps to register user: 1)get details from the frontend
   2)check validation
   3)check if user already exist  username and email
   4) check images and avatar send it to cloudinary, check for avatar
   5)create  user object  create entry in db
  6)remove password and refresh token from the field 
  7)check for user creation
  8)return res 
  */

    const { fullName, username, email, password } = req.body;
    //   if(fullName===""){
    //     return new Error
    //   }

    if (
        [fullName, username, email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, 'All fields are required')
    }

    const existedUser=User.findOne({
        $or:[{ username },{ email }]
    })
 
    if (existedUser) {
        throw new ApiError(409,"Username already exist")
    }
//req.files since we are using middleware files are properties that we have access to because of middleware multer (user.router.js)
    const avatarLocalPath=req.files?.avatar[0]?.path;
    const coverImageLocalPath=req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,'Avatar is required')
    }

const  avatar=await uploadOnCloudinary(avatarLocalPath);
const coverImage=await uploadOnCloudinary(coverImageLocalPath);

if(!avatar){
    throw new ApiError(400,'Avatar is required')

}
const user=await User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url || '' , //we are checking cover iMgae is present or not since we have not checked
    email,
    password,
    username:username.toLowerCase(),

})
const createdUser=await User.findById(user._id).select("-password -refreshToken")
//so we checked wheather createdUser is created or not and unselect password and refreshtoken we dont need them

if (!createdUser) {
    throw new ApiError(500,'Error while creating the User')
}

 return res.status(201).json(
    new ApiResponse(200,createdUser,"User registered Successfully")
 )
});

export { registerUser };
