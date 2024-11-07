const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    code: String,
    brand: String,
    count: Number,
    category: String,
    image: String,
    price:Number,
}, {
    collection: "Product"
})

module.exports=mongoose.model("Product",productSchema)