const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("../UserDetails");
const User = mongoose.model("User");

// login data

router.route("/").post(async (req, res) => {
  const { email, password } = req.body;
  const oldUser = await User.findOne({ email: email });

  if (!email || !password) {
    return res.send({ status: "empty", data: oldUser });
  }
  
  else if (oldUser && (await bcrypt.compare(password, oldUser.password))) {
    const accessToken = jwt.sign(
      {
        email: oldUser.email,
      },
      process.env.SECRET_ACCESS_TOKEN
      // { expiresIn: "10m" }
    );
    return res.status(200).json({ status: "ok", data: accessToken });
  } else {
    return res.json({ status: "Failed", data: "mismatching" });
  }
});

module.exports = router;
