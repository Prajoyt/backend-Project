// require('dotenv').config({
//     path:'./env'
// }); //ReferenceError: require is not defined in ES module scope, you can use import instead

import dotenv from 'dotenv';
import connectDB from './db/index.js';

dotenv.config({
    path:'./env'
})

connectDB();









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