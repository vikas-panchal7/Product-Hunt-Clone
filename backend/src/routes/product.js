const express = require("express");
const router = express.Router();
var multer = require("multer");
var upload = multer();
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
router.post("/products/details/:id", viewProductById);

//create product
router.post("/product/create", auth,upload.none(), createProduct);

//comment Product
router.post("/product/comment/:id", auth, commentProduct);

//like Product
router.post("/product/like/:id", auth, likeProduct);

module.exports = router;
