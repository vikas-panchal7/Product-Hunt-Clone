const express = require("express");
const path = require("path");
const router = express.Router();
var multer = require("multer");
const {
  createProduct,
  createProductcategory,
  commentProduct,
  likeProduct,
  viewProduct,
  viewProductById,
  getlikeProduct,
} = require("../controllers/productcontroller");
const auth = require("../middleware/auth");

// view  all products
router.post("/products/", viewProduct);

// view   product by id
router.post("/products/details/:id", viewProductById);

//create product
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      "avt" + Date.now() + "A" + Math.round(Math.random() * 1000);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpe?g|png|gif|bmp)$/i)) {
    return cb(new Error("please upload Image"));
  }
  cb(undefined, true);
};

const img = multer({
  storage: storage,
  fileFilter: fileFilter,
});

const imges = img.fields([
  { name: "img", maxCount: 1 },
  { name: "img1", maxCount: 1 },
]);
router.post("/product/create", auth, imges, createProduct);

//comment Product
router.post("/product/comment/:id", auth, commentProduct);

//like Product
router.post("/product/like/:id", auth, likeProduct);

//getlikes of Product
router.post("/product/getlike/:id", getlikeProduct);

module.exports = router;
