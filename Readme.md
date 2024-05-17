PORT=8000

//MONGODB_URI=mongodb+srv://prajoyt:prajoyt123@cluster0.bfgtpbz.mongodb.net/

removed slash from the end to become routing easy.
so we get
//MONGODB_URI=mongodb+srv://prajoyt:prajoyt123@cluster0.bfgtpbz.mongodb.net

whenever connect db always use async await and trycatch method because db may be in another continent.(watch in src/index.js) better use IIFE(immediatelyinovked function ) and good practice is it to start  with ;


lecture 8 connected mongodb atlass 
 2 methods of connection of mongodb very useful helped in understanding   


 lecture 9 creating serber and connecting it to the data base and using express.
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
/instagram  request  so middleware will check if user ispresent or not to check their presmce many middlewares are possible so next is 


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
