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

