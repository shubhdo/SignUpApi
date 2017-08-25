const express = require('express');
const body_parser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const request = require('request');
const async = require('async');
const multer = require('multer')
let User = require('./User');

let url = 'mongodb://localhost:27017/signup';
mongoose.connect(url, {
    useMongoClient: true
});
let db = mongoose.connection;

db.on('error', function (error) {
    console.log(error);
});

db.once('open', function () {
    console.log("connected");
});
const app = express();
app.use(body_parser.json());

app.use(body_parser.urlencoded({extended: false}));


app.post('/addUser', function (req, res) {

    let user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        gender: req.body.gender,
        dob: req.body.dob,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        contact: req.body.contact

    });
    user.save(function (error, result) {
        if (error) {
            console.log(error);
            res.status(400).send({
                responseCode: 400,
                result: error.message
            });
        }
        else {
            console.log("---------------", result);
            res.status(200).send({
                responseCode: 200,
                responseMessage: 'User Added Successfully',
                result: result
            });

        }
    })
});
/*function (result, callback) {
   let requestSettings = {
        url: req.body.url,
        method: 'GET',
        encoding: null
    };

    request(requestSettings, function (error, response, body) {

        let filePath = './images/img' + new Date().getTime() + ".jpg";
        fs.writeFile(filePath, body, 'ascii', function (err) {
            if (err) {
                console.log(err);
                callback(err);
            }
            else {
                callback(null, result, filePath)
            }
        });

    });



},*/
/* function (result, path, callback) {
     User.findOneAndUpdate({_id: result._id}, {
         $set: {
             imagePath: path
         }
     }, function (er, re) {
         if (er) {
             console.log(er);
             callback(er);
         }
         else {
             console.log("*******************", re);
             callback(null, re)

         }
     })
 }*/
/*  ], function (error, results) {
      if (error) {
          console.log(error);
          res.status(400).send({"error": error});
      }
      else {
          console.log("+++++++++++++++++++", results);
          res.status(200).send({
              responseCode: 200,
              responseMessage: 'User Added Successfully',
              result: results
          });
      }
  })
});*/

/*app.post('/saveImageInBase64', function (req, res) {
    let filePath = './images64/img' + new Date().getTime();
    let requestSettings = {
        url: req.body.url,
        method: 'GET',
        encoding: null
    };

    request(requestSettings, function (error, response, body) {
        let data;
        console.log(response)
        if (!error && response.statusCode === 200) {
            data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
            fs.writeFile(filePath, data, null, function (err) {
                if (err) {

                    res.status(400).send({"error": "error saving file"})
                }
                else {
                    res.status(200).json("File succcessfully saved")

                }
            })
        }

    })
});

app.get('/img', function (req, res) {
    User.findOne({_id: "599bf2109587eede2015282a"}, function (error, success) {
        console.log(success);
        res.set('Content-Type', success.profilePic.contentType);
        res.send(success.profilePic.data);
    })

})*/

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "" + Date.now() + ".jpg")
    }
});

let upload = multer({storage: storage, encoding: "base64"}).single('file');


/*function encodeAndSaveImage(path, contentType) {
    let temp;
    fs.readFile(path, function (err, data) {
            if (err)
                console.log(err);
            else {
                temp = "data:" + contentType + ";base64," + new Buffer(data).toString('base64');
                fs.writeFile('./imagesIn64/img' + new Date().getTime(), temp, null, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log("Scucessfully converted")
                    }
                })
            }
        }
    )
}

app.post('/saveImage', function (req, res) {
    upload(req, res, function (err) {
        console.log(req.file.mimetype);

        if (err)
            return res.send({"error": err.message});
        else
            res.send("File is uploaded");
        encodeAndSaveImage(req.file.path, req.file.mimetype);
    })
});*/


app.post("/upload", multer({dest: "./upload/"}).single('file'), function (req, res) {
    let path = './upload/img' + new Date().getTime()+".jpg";
    console.log(req.body);
    async.waterfall([
        function (callback) {
            let temp = "data:" + req.file.mimetype + ";base64," + new Buffer(fs.readFileSync(req.file.path)).toString("base64");
            fs.writeFile(path, temp, null, function (err) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, path)
                    console.log("Sucessfully converted")
                }
            });
            fs.unlink(req.file.path);
        },
        function (path, callback) {
            User.findOneAndUpdate({_id: req.body.id}, {
                $set: {
                    imagePath: path
                }
            }, function (er, re) {
                if (er) {
                    console.log(er);
                    callback(er);
                }
                else {
                    console.log("*******************", re);
                    callback(null, re)

                }
            })
        }
    ], function (error, results) {
        if (error) {
            console.log(error);
            res.status(400).send({"error": error});
        }
        else {
            console.log("+++++++++++++++++++", results);
            res.status(200).send({
                responseCode: 200,
                responseMessage: 'Image Added Successfully',
                result: results
            });
        }
    })

});

/*
app.get('/upload/:imgName',function (req,res) {
    console.log(req.params.imgName)
   if (req.params.imgName===undefined) {
       res.status(400).send({"error":"send valid name"});
       return;
   }
    res.setHeader('content-type', 'image/jpeg');
    let img = new Buffer(fs.readFileSync('./upload/'+req.params.imgName), 'base64');
    res.end(img)
});
*/
app.post("/save", multer({dest: "./upload/"}).single('file'), function (req, res) {
    let data =fs.readFileSync(req.file.path,'utf-8');
    let imageBuffer = decodeBase64Image(data);
    let paths = './image/img' + new Date().getTime()+".jpg";
    async.waterfall([
        function (callback) {
            fs.writeFile(paths, imageBuffer.data, function(err) {
                if (err) {
                    console.log(err);
                    callback(err);
                }
                else {
                    callback(null, paths);
                    console.log("Sucessfully converted")

                }
            });
            fs.unlink(req.file.path);
        },
        function (path, callback) {
            User.findOneAndUpdate({_id: req.body.id}, {
                $set: {
                    imagePath: path
                }
            }, function (er, re) {
                if (er) {
                    console.log(er);
                    callback(er);
                }
                else {
                    console.log("*******************", re);
                    callback(null, re)

                }
            })
        }
    ], function (error, results) {
        if (error) {
            console.log(error);
            res.status(400).send({"error": error});
        }
        else {
            console.log("+++++++++++++++++++", results);
            res.status(200).send({
                responseCode: 200,
                responseMessage: 'Image Added Successfully',
                result: results
            });
        }
    })


});

function decodeBase64Image(dataString) {
    let matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}


app.listen(3001, function () {
    console.log("listening on 3001")
});




