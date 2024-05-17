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
export {app}
