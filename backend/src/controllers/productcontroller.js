const Product = require("../models/product");
const Category = require("../models/pro_category");

// @desc     Create a new product
// @route   /product/create
const createProduct = async (req, res) => {
  const addproduct = new Product({ ...req.body, owner: req.user.id });
  try {
    await addproduct.save();
    res.status(201).send(addproduct);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

//@desc  Create Product Category
//@route  /product/category/create

const createProductcategory = async (req, res) => {
  const category = new Category(req.body);
  try {
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

module.exports = { createProduct, createProductcategory };
