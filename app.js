const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const port = process.env.PORT || 5000;
const dotenv = require("dotenv");
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
const mongoUrl = process.env.MONGODB_URL;

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((e) => {
    console.log(e);
  });

const productRoute = require("./routes/productRoutes");
const userRoute = require("./routes/userRoutes");
const loginRoute = require("./routes/authRoutes");
const tokenRoute = require("./routes/tokenRoutes");
const listRoute = require("./routes/prolistRoutes");
const categoryRoute = require("./routes/getCategoryData");
const brandRoute = require("./routes/BrandRoutes");
const getallproductRoute = require("./routes/getAllProductsRoutes");
const getOneUser = require("./routes/getUserDataRoute");
const updateUserRoute = require("./routes/updataUserRoute");
const getAccoutRoute = require("./routes/getAccoutRoute");
const searchRoute = require("./routes/searchRoute");
const postCartRoute = require("./routes/PostCartDetails");
const checkCartRoute = require("./routes/PostCartDetails");
const getCartDataRoute = require("./routes/GetCartRoutes");
const getUserInCart = require("./routes/getUserInCart");
const wishList = require("./routes/WishlistRoutes");
const wishListTwo = require("./routes/GetWishlist");
const wishListThree = require("./routes/WishlistRouteThree");

app.use("/product", productRoute);
app.use("/user", userRoute);
app.use("/login", loginRoute);
app.use("/token-setup", tokenRoute);
app.use("/list", listRoute);
app.use("/category", categoryRoute);
app.use("/brand", brandRoute);
app.use("/get-all-data", getallproductRoute);
app.use("/account_get", getAccoutRoute);
app.use("/profile_get", getOneUser);
app.use("/profile_update", updateUserRoute);
app.use("/search", searchRoute);
app.use("/api", postCartRoute);
app.use("/api", checkCartRoute);
app.use("/cart", getCartDataRoute);
app.use("/user_cart", getUserInCart);
app.use("/wishlist", wishList);
app.use("/wishlist-two", wishListTwo);
app.use("/wishlist-three", wishListThree);

app.listen(port, (e) => {
  if (!e) {
    console.log("successfully connected in "+port+" port");
  } else {
    console.log("Error has occured in port connection" + e);
  }
});
