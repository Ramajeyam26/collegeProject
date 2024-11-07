const mongoose = require("mongoose");

require("./Product");
const Product = mongoose.model("Product");

const cartDetail = new mongoose.Schema({
  userId: String,
  productId: [{ type: mongoose.Schema.Types.ObjectId, ref: Product }],
//   cartStatus: { type: String, default: "Go To Cart" },
});

module.exports = mongoose.model("Cart", cartDetail);
