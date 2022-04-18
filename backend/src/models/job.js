const mongoose = require("mongoose");
const validator = require("validator");

const jobSchema = new mongoose.Schema(
  {
    companyname: { type: String, trim: true, required: true },
    companytagline: { type: String, trim: true, required: true },
    jobtitle: { type: String, required: true },
    category: {
      type: String,
      required: true,
    },
    joblink: {
      type: String,
      trim: true,
      required: true,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Please Provide Valid Link");
        }
      },
    },
    logo: {
      type: String,
      trim: true,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
