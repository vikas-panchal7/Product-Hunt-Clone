const express = require("express");
const path = require("path");
const router = express.Router();
var multer = require("multer");
const { createJob, viewjobs } = require("../controllers/jobcontroller");
const auth = require("../middleware/auth");

//create Job
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/jobs/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      "avt" + Date.now() + "A" + Math.round(Math.random() * 1000);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpe?g|png|gif|bmp|svg)$/i)) {
    return cb(new Error("please upload Image"));
  }
  cb(undefined, true);
};

const img = multer({
  storage: storage,
  fileFilter: fileFilter,
});

//for create new job
router.post("/jobs/create", auth, img.single("logo"), createJob);

//for all jobs
router.post("/jobs", viewjobs);

module.exports = router;
