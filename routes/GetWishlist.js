const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

require("../Wistlist");
const Wishlist = mongoose.model("Wishlist");

router.route("/wishlist-get").get(async (req, res) => {
  const userId = req.query.userId;

  try {
   await Wishlist.findOne({userId:req.query.userId})
    .populate("wishProductId")
    .then((data) => {
      console.log(data);
      return res.json({ status: "successfull", data: data });
    })
    .catch((error) => {
      console.log(error);
      return res.json({ status: "failed", data: error });
    });
  } catch (error) {
    console.log("Error in get wishlist route two " + error);
    return res.json({ status: "error", data: error });
  }
});

module.exports = router;
