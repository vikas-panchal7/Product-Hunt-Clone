const express = require("express");
const path = require("path");
const router = express.Router();
var multer = require("multer");
const {
  createJob,
  viewjobs,
  getmyjobs,
  updateJob,
  deleteJob,
} = require("../controllers/jobcontroller");
const auth = require("../middleware/auth");

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

//for my jobs
router.get("/jobs/myjobs", auth, getmyjobs);

//for update jobs
router.put("/jobs/update/:id", auth, img.single("logo"), updateJob);

//delete job
router.delete("/job/delete/:id", auth, deleteJob);

module.exports = router;
