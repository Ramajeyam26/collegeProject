const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

require("../Product");
const Product = mongoose.model("Product");

router.route("/:name").get(async (req, res) => {
  //   const { name } = req.query.name;
  //   const { brand } = req.query.brand;

  const { name } = req.params;

  console.log(name);
  try {
    const result = await Product.find({
      $or: [
        { name: { $regex: name, $options: "i" } },
        { brand: { $regex: name, $options: "i" } },
      ],
    });
    console.log(result);
    if (result) {
      console.log("successfully search product is get");
      return res.json({ status: "successfull", data: result });
    } else {
      console.log("failed to search product is get");
      return res.json({ status: "failed" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", data: error });
  }
});

module.exports = router;
