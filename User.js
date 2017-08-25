const mongoose = require('mongoose');

const Schema=mongoose.Schema;


const User=new Schema({
    firstname:{
        type:String,
        required:[true,'Please enter the first name'],
        match:[/^[A-Za-z]+$/,'Only alphabets are allowed'],
        trim:true
    },
    lastname:{
        type:String,
        required:[true,'Please enter the last name'],
        match:[/^[A-Za-z]+$/,'Only alphabets are allowed'],
        trim:true
    },
    email:{
        type:String,
        required:[true,'Please enter the email'],
        match:[/\S+@\S+\.\S+/,'Please enter a valid email'],
        unique:[true,'email already registered'],
        trim:true
    },
    gender:{
        type:String,
        required:[true,'Please enter the gender(male or female)'],
        enum:['male','female']
    },
    dob:{
        type:Date,
        required:[true,'Please enter DOB'],
    },
    country:{
        type:String,
        required:[true,'Please enter the country'],
        trim:true,
        match:[/^[A-Za-z ]+$/,'Only Alphabets are allowed']

    },
    state:{
        type:String,
        required:[true,'Please enter the state'],
        trim:true,
        match:[/^[A-Za-z ]+$/,'Only Alphabets are allowed']

    },
    city:{
        type:String,
        required:[true,'Please enter the city'],
        match:[/^[A-Za-z ]+$/,'Only Alphabets are allowed'],
        trim:true
    },
    contact:{
        type:Number,
        required:[true,'Please enter the contact no'],
        match:[/^[0-9]{10,14}$/,'Only numeric value is allowed(10-14 digits only']

    },

    imagePath:{
        type:String
    }
});

module.exports=mongoose.model('User',User,'User');