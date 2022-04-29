const express = require("express");
const path = require("path");
const router = express.Router();
var multer = require("multer");
const {
  createProduct,
  commentProduct,
  likeProduct,
  viewProduct,
  viewProductById,
  getlikeProduct,
  viewUpcomingProduct,
  getmyProducts,
  updateProduct,
} = require("../controllers/productcontroller");
const auth = require("../middleware/auth");

// view  all products
router.post("/products/", viewProduct);

// view  upcoming products
router.post("/products/upcomings", viewUpcomingProduct);

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

router.put("/products/update/:id", auth, imges, updateProduct);

//comment Product
router.post("/product/comment/:id", auth, commentProduct);

//like Product
router.post("/product/like/:id", auth, likeProduct);

//getlikes of Product
router.post("/product/getlike/:id", getlikeProduct);

//get my products
router.get("/products/myproducts", auth, getmyProducts);

module.exports = router;
