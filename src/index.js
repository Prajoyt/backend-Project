// require('dotenv').config({
//     path:'./env'
// }); //ReferenceError: require is not defined in ES module scope, you can use import instead

import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { app } from './app.js';

dotenv.config({
    path:'./env'
})

const port =process.env.PORT || 8000;
 
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








/*  ist approach
import express from "express";
const app = express();
; (async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on('error', (error) => {
            console.log('ERROR:', error);
            throw err;
        })
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on the port,${process.env.PORT}`);
        })
    } catch (error) {
        console.error('ERROR:', error)
        throw err
    }
})()
*/