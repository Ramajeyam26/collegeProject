const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../Product');
const Product = mongoose.model("Product");

router.route('/:brand').get(async (req, res) => {
    const brand = req.params;
    try {
        const result = await Product.find(brand);
        if (result) {
            return res.json({status:"successfully",data:result})
        } else if (!result) {
            return res.json({status:"failed"})
        }

    } catch (error) {
        return res.send({status:"error",data:error})
    }
})

module.exports = router;