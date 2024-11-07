const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

require("../UserDetails");
const User = mongoose.model("User");
router.route("/").post(async (req, res) => {
  const { token } = req.body;
  // if (token) {
  //     return res.send({status:"ok",data:token})
  // } else {
  //     return res.send({status:"bad",data:e})
  // }
  try {
    const user = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
    const useremail = user.email;
    //   if (user) {
        // return res.status(200).send({ status: "verified", data: user });
    //   }
    //   else {
        // return res.status(400).send({ status: "failed", data: user });
    //   }
    await User.findOne({ email: useremail })
      .then((data) => {
        return res.status(200).json({ status: "verified", data: data });
      })
      .catch((error) => {
        return res.status(400).send({ data: error });
      });
  } catch (error) {
    return res.status(401).send({ status: "NotVerified", data: error });
  }
});
module.exports = router;
