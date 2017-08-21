const mongoose = require('mongoose');

const Schema=mongoose.Schema;

const User=new Schema({
   firstname:{
       type:String,
       required:true,
       trim:true
   },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    gender:{
        type:String,
        required:true,
        enum:['Male','Female','Others']
    },
    dob:{
        type:Date,
        required:true
    },
    country:{
        type:String,
        trim:true
    },
    state:{
        type:String,
        trim:true
    },
    city:{
        type:String,
        trim:true
    },
    contact:{
        type:Number,
        min:10,
        max:14
    },
    profilePic:{
        type:Buffer,
        contentType:String
    },
});

module.exports=mongoose.model('User',User,'User');