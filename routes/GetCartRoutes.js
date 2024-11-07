const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

require("../Cart");
const Cart = mongoose.model("Cart");

router.route("/get-cart").get(async (req, res) => {
  await Cart.findOne({userId:req.query.userId})
    .populate("productId")
    .then((data) => {
      console.log(data);
      return res.json({ status: "successfully", data: data });
    })
    .catch((error) => {
      console.log(error);
      return res.json({ status: "failed", data: error });
    });
});

router.route("/del-cart").delete(async (req, res) => {
  try {
   const delResult= await Cart.findOneAndUpdate(
      { _id: req.query.userId },
      { $pull: { productId: req.query.proId } },
      { new: true }
      );
      if (!delResult) {
          console.log(delResult);
          return res.json({status:"notFound"})
      }
      if (delResult) {
          console.log(delResult);
          return res.json({ status: "successfull", data: delResult });
      }
  } catch (error) {
      console.log(error);
      return res.json({ status: "failed", data: error });
  }
});

module.exports = router;
