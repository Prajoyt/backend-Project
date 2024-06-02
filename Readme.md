PORT=8000
 
//MONGODB_URI=mongodb+srv://prajoyt:prajoyt123@cluster0.bfgtpbz.mongodb.net/

removed slash from the end to become routing easy.
so we get
//MONGODB_URI=mongodb+srv://prajoyt:prajoyt123@cluster0.bfgtpbz.mongodb.net

whenever connect db always use async await and trycatch method because db may be in another continent.(watch in src/index.js) better use IIFE(immediatelyinovked function ) and good practice is it to start  with ;


lecture 8 connected mongodb atlass 
 2 methods of connection of mongodb very useful helped in understanding   


 lecture 9 creating server and connecting it to the data base and using express.
 //since coonect db is async function it will returns us promise
connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`Server is connected to the dand running on the port:${port}`);
    })
})
.catch((err)=>{
    console.log('ERROR IN MONGODB:connecting :'.err);
})

***wheneverwe use middleware it will be mostly .use() or in config****

what is middleware:when request is asked  before sending the data if we need to check conditions to send how much data is to send middleware()
like
/instagram  request  so middleware will check if user is present or not to check their presmce many middlewares are possible so next is 


It is wrapper function we wil use and since it going to be used multiple times we cretad in the util folder

import { json } from "express"

//ist method
const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((err) => next(err))
    }
}

export {asyncHandler}


/*const asyncHandler=()=>{}
const asyncHandler=(func)=>()=>{}
const asyncHandler=(func)=>async()=>{} */


/* 2nd method
it is wrapper function can be used many times
const asyncHnadler=(func)=>async(req,res,next)=>{
    try {
        await func(req,res,next)
    } catch (error) {
        res.status(err.code||5000).json({
            success:false,
            message:err.message,
        })
    }
} */

Lecture 10
Created user model and video model file 
important thing is index in username should be used and it should not be used not every object should know about it.

//jwt is bearer token

userSchema.methods.generateAccessToken=function(){
    jwt.sign({
        _id:this._id  (these data is present in the mongodb not present inschema is ok)
    })
}


lecture 11 how to upload files 
00:03 File upload is mainly handled by the back end engineers
01:52 The method for uploading files in the backend depends on project size, calculations, and file handling.
05:55 Multer is a commonly used package for file uploading in the industry.
07:42 Spelling mistake in the stack was corrected and minor bug fixed
11:35 Upload files to the server using Cloudinary
13:17 Uploading and managing files in backend using Multer
17:05 Upload a file in backend using Multer
19:05 Upload a local file in backend using Multer
22:33 Upload a file in the backend and print a success message
24:29 The 'unlink' function is used to remove locally saved temporary files in case of failed upload operations
27:47 Multer is a middleware used for file uploading in the backend.
29:32 You can choose between disk storage and memory storage for uploading files in the backend using Multer.
32:47 Naming the file with a unique ID
34:26 Configuring the file upload using Multer
37:50 Learn how to upload files in the backend using Multer



setup cloudinary and multer middleware

import {v2 as cloudinary} from 'cloudinary';
import fs from  "fs"
          
cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary=async(localFilePath)=>{
 try {
    if(!localFilePath)
        return null
    //upload the file on cloudinary
    const response=await cloudinary.uploader.upload(localFilePath,{
        resource_type:auto
    })
//file has been added successfully
console.log('file is uploaded in cloudinary', response.url);
return response
 } catch (error) {
    fs.unlinkSync(localFilePath); //remove the locally saved temporaray file
    return null
    
 }
}
export {uploadOnCloudinary}

import multer from 'multer';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
 export  const upload = multer({ storage: storage })





lecture 12
00:03 HTTP crash course provides a broad overview of how things interact
02:15 The main difference between HTTP and HTTPS is that data sent through HTTPS is encrypted and becomes readable only on the server or client.
06:17 HTTP headers are a way to send additional information about the request or response
08:16 HTTP headers can be categorized into request headers, response headers, and representation headers.
11:59 User agents provide information about the user and can trigger app downloads
13:46 HTTP methods are used to perform specific operations
17:34 HTTP Methods: PUT and PATCH
19:24 HTTP status codes are used to communicate the success or failure of a request.
22:43 The difference between a good programmer and an average programmer is the amount of resources and information they gather.

what are http header
metadata presented in key value pair sent along with request and response
hededer are used foe authentication caching  and manage state

request header - from client 
response header - from server

representation header- encoding /compression
payload heaader -data

http methods basic set of operation that can be used to interact with server
 get: retrieve the resource
 put:replace the resource (complete change of resource)
 patch:replace apart of resource 
 post:itereact with resource

 4xx client error image size is wring wrong email wrong password
 5xx server error


 lecture 13 created user.controller.js and user.router.js
 2nd used asyncHandling in user.controller.js
 exported both the files in app.js

 Error: Route.post() requires a callback function but got a [object Undefined]  check for return statement 