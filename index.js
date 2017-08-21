const express = require('express')
const body_parser = require('body-parser');
const mongoose = require('mongoose');
const indicative = require('indicative');
const async = require('async');
let User = require('./User');

let url = 'mongodb://localhost:27017/formhandler';
mongoose.connect(url, {
    useMongoClient: true
});
let db = mongoose.connection;

db.on('error',function (error) {
    console.log(error);
});

db.once('open',function () {
    console.log("connected");
});
const app = express();
app.use(body_parser.json());

app.use(body_parser.urlencoded({extended: false}));


app.post('/addUser',function (req,res) {



});