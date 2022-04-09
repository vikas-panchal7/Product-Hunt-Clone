const mongoose = require("mongoose");
const validator = require("validator");
const likeSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const commentSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, require: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    reply: [
      {
        name: { type: String, required: true },
        comment: { type: String, require: true },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const productSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    tagline: { type: String, trim: true, required: true },
    description: { type: String, required: true },
    type: {
      type: String,
      enum: {
        values: ["Upcoming", "Launched"],
        message: "{VALUE} is not valid !",
      },
    },
    category: {
      type: String,
      required: true,
    },
    videourl: {
      type: String,
      trim: true,
      required: true,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Please Provide Valid Url");
        }
      },
    },
    img: {
      type: String,
      trim: true,
      required: true,
    },
    img1: {
      type: String,
      trim: true,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likes: [likeSchema],
    comment: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Products", productSchema);
module.exports = Product;
