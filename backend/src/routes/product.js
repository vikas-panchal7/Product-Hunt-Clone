const express = require("express");
const router = express.Router();
const {
  createProduct,
  createProductcategory,
} = require("../controllers/productcontroller");
const auth = require("../middleware/auth");

//create product
router.post("/product/create", auth, createProduct);

//create product category
router.post("/product/category/create", auth, createProductcategory);

module.exports = router;
