const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

// multer storage creation
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    const currentDate = Date.now();
    cb(null, currentDate + file.originalname);
  },
});

const uploads = multer({ storage: storage });

// post api

require("../Product");
const Product = mongoose.model("Product");
router.route("/").post(uploads.single("image"), async (req, res) => {
  const { name, code, brand, category, count, price } = req.body;
  const image = req.file.filename;

  await Product.create({
    name: name,
    code: code,
    brand: brand,
    category: category,
    count: count,
    image: image,
    price: price,
  })
    .then(() => {
      return res.send({ status: "ok", data: "add product" });
    })
    .catch((error) => {
      return res.send({ status: "error", data: error });
    });
});

// get

router.route("/").get(async (req, res) => {
  await Product.find({})
    .then((data) => {
      return res.send({ status: "ok", data: data });
    })
    .catch((error) => {
      console.log(error);
    });
});

// get api

router.route("/:id").get(async (req, res) => {
  // const { id } = req.params;
  await Product.findById(req.params.id)
    .then((data) => {
      return res.send({ status: "ok", data: data });
    })
    .catch((error) => {
      console.log(error);
    });
});

// put api

router.route("/:_id").put(uploads.single("image"), async (req, res) => {
  const { name, code, brand, price, count, category } = req.body;
  // let image = req.file;
  console.log(code+" "+name+" "+brand);
  try {
    let image = "";
    if (req.file) {
      image = req.file.filename;
    }

    const exitingData = await Product.findById(req.params);

    if (image !== "") {
      exitingData.image = image;
    }

    exitingData.name = name;
    exitingData.code = code;
    exitingData.brand = brand;
    exitingData.price = price;
    exitingData.count = count;
    exitingData.category = category;

    const updateData = await exitingData.save();

    return res.send({ status: "ok", data: updateData });
  } catch (error) {
    return res.send({ status: "bad", data: error });
  }
});

// delete

router.route("/:_id").delete(async (req, res) => {
  // const { id } = req.params;
  await Product.deleteOne(req.params)
    .then(() => {
      return res.send("deleted successfully");
    })
    .catch((error) => {
      return res.send(error);
    });
});

module.exports = router;
