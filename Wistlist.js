const mongoose = require('mongoose');

require("./Product");
const Product = mongoose.model("Product");

const wishlistSchema = new mongoose.Schema({
    userId:String,
    wishProductId:[{type:mongoose.Schema.Types.ObjectId, ref:Product}]
}, {
    collection:"Wishlist"
})

module.exports = mongoose.model("Wishlist", wishlistSchema);