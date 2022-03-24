const mongoose = require("mongoose");

const productypeSchema = new mongoose.Schema({
  category: {
    type: String,
    unique: true,
    required: true,
  },
});

const ProductType = mongoose.model("Category", productypeSchema);
module.exports = ProductType;
