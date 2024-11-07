const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

require("../UserDetails");
const User = mongoose.model("User");

const myMiddleware = (req, res, next) => {
  console.log('This is a middleware function');
  next(); // Call next to pass control to the next middleware function
};

router.route("/:_id").put(myMiddleware,async (req, res,next) => {
  const { name, age, mobilenumber, email } = req.body;
  const id = req.params;

  // console.log(mobilenumber);
  try {
    const userData = await User.findById(req.params);
    console.log(userData);
    if (userData) {
      console.log("SUccessfully user get", userData.name);
      userData.name = name;
      userData.age = age;
      userData.mobilenumber = mobilenumber;
      userData.email = email;
      const result = await userData.save();
        console.log(userData.name);
      if (result) {
        // console.log("successfully update user detail");

        return res.send({ status: "successfully", data: result });
      } else {
        // console.log("not successfully");
        return res.send({status:"failed"})
      }
      return res.status(200);
    } else {
      console.log("bad");
    }


  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});
module.exports = router;
