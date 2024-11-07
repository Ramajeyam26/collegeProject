const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

require("../Wistlist");
const Wishlist = mongoose.model("Wishlist");

router.route("/wishlist-post").post(async (req, res) => {
  const userId = req.query.userId;
  const proId = req.query.proId;
  await Wishlist.create({ userId: userId, wishProductId: proId })
    .then((data) => {
      console.log(data);
      return res.json({ status: "successfull", data: data });
    })
    .catch((error) => {
      console.log(error);
      return res.json({ status: "failed", data: error });
    });
});

router.route("/wishlist-update").put(async (req, res) => {
  const userId = req.query.userId;
  const proId = req.query.proId;
  try {
    const PutResult = await Wishlist.findOneAndUpdate({userId:userId}, {
      $push: { wishProductId: proId },
    });
    await PutResult.save();
    if (PutResult) {
      console.log("Product id push into array successfully");
      return res.json({ status: "successfull", data: PutResult });
    } else if (!PutResult) {
      console.log("Failed to update product in array " + error);
      return res.json({ status: "failed", data: PutResult });
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", data: error });
  }
});

router.route("/wishlist-get").get(async (req, res) => {
  const userId = req.query.userId;
  try {
    const GetResult = await Wishlist.findOne({ userId: userId });
    if (GetResult) {
      console.log("Wishlist detail get successfully");
      return res.json({ status: "successfull", data: GetResult });
    } else if (!GetResult) {
      console.log("Wishlist detail get Unsuccessfully");
      return res.json({ status: "failed", data: GetResult });
    }
  } catch (error) {
    console.log("Error has occur  " + error);
    return res.json({ status: "error", data: error });
  }
});

router.route("/wishlist-delete").delete(async (req, res) => {
  const wishId = req.query.wishId;
  const proId = req.query.proId;
  await Wishlist.findOneAndUpdate(
    { _id: wishId },
    { $pull: { wishProductId: proId } }
  )
    .then((data) => {
      console.log("The product deleted successfully");
      return res.json({ status: "successfull", data: data });
    })
    .catch((error) => {
      console.log("Failed to delete product id in array " + error);
      return res.json({ status: "failed", data: error });
    });
});

module.exports = router;
