const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

require("../Product");
const Product = mongoose.model("Product");

router.route('/').get(async (req, res) => {
    try {
        const result = await Product.find();
        if (result) {
            return res.json({ status: "successfully", data: result });
        } else {
            return res.json({status:"failed"})
        }
    } catch (error) {
        return res.send(error);
    }
})

module.exports = router;