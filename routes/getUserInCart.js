const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

require("../Cart");
const Cart = mongoose.model("Cart");

router.route("/getuser").get(async (req, res) => {
  const userId = req.query.userId;
  try {
    const getUser = await Cart.findOne({ userId: userId });
    console.log(getUser);
    if (getUser) {
      console.log("Data get successfully");
      return res.json({ status: "successfull", data: getUser });
    } else {
      console.log("Data not found");
      return res.json({ status: "NotFound", data: getUser });
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: "failed", data: error });
  }
});

router.route("/updateuser").put(async (req, res) => {
  try {
    const proId = req.query.proId;
    const userId = req.query.userId;
    const productList = await Cart.findOneAndUpdate(
      { userId: userId },
      { $push: { productId: proId } },
      { new: true }
    );
    if (productList) {
      console.log("Update successfully ");
      return res.json({ status: "successfully", data: productList });
    } else {
      console.log("Update Unsuccessfully " + productList);
      return res.json({ status: "failed", data: productList });
    }
  } catch (error) {
    console.log("Error has occur in update cart " + error);
  }

  //   productList.productId[1] = id;
  // const updateProduct = await productList.save();
});

module.exports = router;
