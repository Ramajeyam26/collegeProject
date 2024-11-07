const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

require("../Cart");
const Cart = mongoose.model("Cart");

router.route("/post-cart").post(async (req, res) => {
  const id = req.query.proId;
  const userid = req.query.userId;
  // const usersResult = await Cart.findOne({ userId: userid });

  try {
    
  } catch (error) {
    
  }
  await Cart.create({ userId: userid, productId: id })
    .then((data) => {
      console.log(data);

      return res.json({ status: "successfully", data: data });
    })
    .catch((error) => {
      console.log(error);

      return res.json({ status: "failed", data: error });
    });
});

router.route("/post-cart").get(async (req, res) => {
  const userId = req.query.userId;
  const proId = req.query.proId;

  await Cart.findOne({
    $and: [{ userId: userId }, { productId: proId }],
  })
    .then((data) => {
      console.log(data);
      if (data == "") {
        console.log("product not available");
        return res.json({ status: "not_available",data:"not available" });
      } else if (data) {
        console.log("product available");
        return res.json({ status: "available", data: data });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.json({ status: "failed", data: error });
    });
});

module.exports = router;
