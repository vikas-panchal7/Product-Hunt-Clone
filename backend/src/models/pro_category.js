const mongoose = require("mongoose");
const validator = require("validator");

const categorySchema = mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
  },
  {
    timestamps: true,
  }
);

const Category = new mongoose.model("Category", categorySchema);
module.exports = Category;
