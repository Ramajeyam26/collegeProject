const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

require("../Product");
const Product = mongoose.model("Product");

router.route("/").get(async (req, res) => {
  await Product.find({}).sort({_id:-1})
    .then((data) => {
      return res.json({ data: data });
    })
    .catch((error) => {
      return res.json({ data: error });
    });
});

router.route("/:id").get(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const result = await Product.findById(id);
    if (result) {
      return res.send({status:"sended",data:result})
    }
    else {
      // return res.send({status:"failed"})
    }

  } catch (error) {
    return res.send({status:"failed",data:error})
}  
    
});

module.exports = router;
