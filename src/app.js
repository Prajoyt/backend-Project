import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app= express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}))

//getting data in json format
app.use(express.json({limit:'16kb'}));
//getting data from the url
app.use(express.urlencoded({extended:true,limit:'20kb'}));
//getting data from static created the folder public
app.use(express.static('public'));

app.use(cookieParser());

//routes so there is always segregation now we will use route
//routes import
 import userRouter from "./routes/user.router.js";

 //now to get route we will be using middleware so rather than using app.get we will use app.use
 //route declaration

 app.use('/api/v1/users',userRouter);

//http://localhost:8000/api/v1/users/register














export {app}
