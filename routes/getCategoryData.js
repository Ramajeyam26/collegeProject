const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

require("../Product");
const Product = mongoose.model("Product");

router.route("/:category").get(async (req, res) => {
  const category = req.params;

  try {
    const result = await Product.find(category);

    if (result) {
      return res.json({ status: "successfully", data: result });
    }
    else if (!result) {
      return res.json({status:"failed"})
    }
  } catch (error) {
    return res.json({ status: "error", data: error });
  }
});

module.exports = router;
