import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        // avatar: {
        //     type: String, //cloudinary url
        //     required: true,
        // },
        avatar:{
            type:String,
            required:true,
        },
        coverImage: {
            type: String, //cloudinary url
        },
        watchHistory: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video",
            },
        ],
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true }
);
//for making use bcrypt we will need to use mongoose hooks 
//not recommenend to use arraow function because it doesnot know context and since it is middleware it is best we called the next and it take time so better use async


//********** these code will encrypt the password*******

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        return next
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()

})
//****code for checking the password ******/ we are creating a method which is not present in the lib

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

//jwt is bearer token

userSchema.methods.generateAccessToken = function () {
    jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email,
        fullName: this.fullName
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
//since refesh token update multiple times  only id are kept init
userSchema.methods.generateRefreshToken = function () {
    jwt.sign({
        _id: this._id,

    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}



export const User = model("User", userSchema);

//these user can connect with db because it is connected with mongoose