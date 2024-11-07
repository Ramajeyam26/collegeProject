const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

require("../UserDetails");
const User = mongoose.model("User");

const myMiddleware = (req, res, next) => {
  console.log('This is a middleware function');
  next(); // Call next to pass control to the next middleware function
};

router.route("/:email").get(myMiddleware,async (req, res) => {
  const email = req.params;
  console.log(email);
  try {
    const data = await User.find(req.params);
    console.log(data)
    if (data) {
      console.log("user detail get successfully");
      return res.json({ status: "successfull", data: data });
    } else {
      console.log("user detail get failed");

      return res.send({ status: "failed" });
    }
  } catch (error) {
    console.log(error);
    return res.send({ status: "error", data: error });
  }
});

module.exports = router;
