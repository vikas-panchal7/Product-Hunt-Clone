const express = require("express");
const router = express.Router();
var multer = require("multer");
const { userInfo } = require("os");
const auth = require("../middleware/auth");
const path = require("path");
const {
  signUp,
  Login,
  Logout,
  Profile,
  userInfos,
  resetpassword,
} = require("../controllers/usercontroller");

//for signup
router.post("/users/signUp", signUp);

//for login
router.post("/users/login", Login);

//for logout
router.post("/users/logout", Logout);

//change profile
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

router.patch("/users/profile", auth, img.single("avtar"), Profile);

//FOR USER DETAILS
router.get("/users/me", auth, userInfos);

router.post("/users/reset", resetpassword);

module.exports = router;
