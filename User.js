const mongoose = require('mongoose');

const Schema=mongoose.Schema;

const User=new Schema({
   firstname:{
       type:String,
       required:[true,'Please enter the first name'],
       match:/^[A-Za-z]+$/,
       trim:true
   },
    lastname:{
        type:String,
        required:[true,'Please enter the last name'],
        match:/^[A-Za-z]+$/,
        trim:true
    },
    email:{
        type:String,
        required:[true,'Please enter the valid email'],
        match:/\S+@\S+\.\S+/,
        unique:true,
        trim:true
    },
    gender:{
        type:String,
        required:true,
        enum:['male','female','Others']
    },
    dob:{
        type:Date,
        required:true,
    },
    country:{
        type:String,
        trim:true,
        match:/^[A-Za-z ]+$/,

    },
    state:{
        type:String,
        trim:true,
        match:/^[A-Za-z ]+$/,

    },
    city:{
        type:String,
        match:/^[A-Za-z ]+$/,
        trim:true
    },
    contact:{
        type:Number,
        match:/^[0-9]{10,14}$/,

    },
    profilePic:{
        data:Buffer,
        contentType:String
    },
    imagePath:{
       type:String
    }
});

module.exports=mongoose.model('User',User,'User');