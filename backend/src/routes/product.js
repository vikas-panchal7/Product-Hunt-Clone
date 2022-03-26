const express = require("express");
const router = express.Router();
const {
  createProduct,
  createProductcategory,
  commentProduct,
  likeProduct,
  viewProduct,
  viewProductById,
} = require("../controllers/productcontroller");
const auth = require("../middleware/auth");

// view  all products
router.post("/products/", viewProduct);

// view   product by id
router.post("/products/details/:id", auth, viewProductById);

//create product
router.post("/product/create", auth, createProduct);

//comment Product
router.post("/product/comment/:id", auth, commentProduct);

//like Product
router.post("/product/like/:id", auth, likeProduct);

//create product category
router.post("/product/category/create", auth, createProductcategory);

module.exports = router;
