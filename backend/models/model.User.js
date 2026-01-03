import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true,
    },
    lastName : {
        type : String,
        required : true,
    },
    email : {
        type:String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    address :{
        type : String,
        required : false
    },
    mobile : {
        type : String,
        required : false
    },
    token : {
        type : String,
       
    },
    role :{
        type: String,
        enum: [ "admin","manager","user" ],
        default: "user"
    },
    resetOTP : String,       // OTP
    resetOTPExpiry : Date    // OTP Expiry time
},{timestamps : true})

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        { 
            id : this._id,
            role: this.role,
            email:this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn : "1d"}
    );
};

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        { 
            id : this._id,
            role : this.role
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn : "3d"}
    )
}

export const User = mongoose.model("User",userSchema);


