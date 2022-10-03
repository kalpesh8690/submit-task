const express = require("express");
const userModel = require("../models/model");
const app = express();
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const img64 = require("./bdf")

app.use(express.json());

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dest = path.join(__dirname, "./images");
    let stat = null;
    try {
      stat = fs.statSync(dest);
    } catch (err) {
      fs.mkdirSync(dest);
    }
    if (stat && !stat.isDirectory()) {
      throw new Error("Directory cannot be created");
    }
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    cb(null, "img-" + Date.now() + path.extname(file.originalname));
  },
});
var upload = multer({ storage: storage, dest: "/upload" }).single("file");
app.set("view engine", "ejs");

app.post("/add_user", upload, async (request, response) => {
  if(!request.body.file){
    var imgMain = fs.readFileSync(request.file.path);
    var encode_img = imgMain.toString("base64");
    var imgBuffer = {
      contentType: request.file.mimetype,
      data: new Buffer(encode_img, "base64"),
    };
   }

  const user = new userModel(request.body);
  if(!request.body.file){
    user.set("img", imgBuffer);
  }else{
    user.set("img", img64);
  }
  console.log(user);
  try {
    await user.save();
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/users", async (request, response) => {
  const users = await userModel.find({});

  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/remove", (request, response) => {
  userModel.findOneAndDelete(request.body, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted : ", docs);
      console.log(request.body);
    }
    try {
      response.send(docs);
    } catch (err) {
      response.status(500).send(err);
    }
  });
});
app.post("/update", upload, async (request, response) => {
 if(!request.body.file){
  var imgMain = fs.readFileSync(request.file.path);
  var encode_img = imgMain.toString("base64");
  var imgBuffer = {
    contentType: request.file.mimetype,
    data: new Buffer(encode_img, "base64"),
  };
 }
  var _id = request.body._id;
  var data = {
    firstname: request.body.firstname,
    lastname: request.body.lastname,
    mobile: request.body.mobile,
    email: request.body.email,
    address: request.body.address,
    img: imgBuffer,
  };
  userModel.findByIdAndUpdate(
    _id,
    data,
    { new: true },
    function (err, dt) {
      if (err) {
        console.log("err", err);
        response.status(500).send(err);
      } else {
        console.log("success");
        response.send(dt);
      }
    }
  );
});

module.exports = app;
