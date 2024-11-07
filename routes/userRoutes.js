const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("../UserDetails");
const User = mongoose.model("User");

//registration request to  app

router.route("/").post(async (req, res) => {
  const { name, age, mobilenumber, email, password } = req.body;
  const oldUser = await User.findOne({ email: email });

  if (!name || !age || !mobilenumber || !email || !password) {
    return res.json({data:"empty"});
  } else if (oldUser) {
    return res.json({ data: "exists" });
  } else {
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name,
      age: age,
      mobilenumber: mobilenumber,
      email: email,
      password: hashPassword,
    })
      .then(() => {
        return res.json({data: "ok" });
      })
      .catch((error) => {
        return res.json({data: error });
      });
  }
});

router.route("/").get(async (req, res) => {
  await User.find({})
    .then((data) => {
      return res.status(200).json({ data: data });
    })
    .catch((error) => {
      return res.status(400).send({ data: error });
    });
});

router.route("/:id").delete(async (req, res) => {
  const { id } = req.params;

  await User.deleteOne({
    _id: id,
  })
    .then(() => {
      return res.status(200).send({ data: "ok" });
    })
    .catch((error) => {
      return res.status(400).send({ data: error });
    });
});

module.exports = router;
