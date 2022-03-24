const Product = require("../models/product");
const ProductType = require("../models/producttype");

// @desc     Create a new product
// @route   /product/create
const createProduct = async (req, res) => {
  const category = await ProductType.findById(req.body.category_id);
  const addproduct = new Product({ ...req.body, owner: req.user._id });
  try {
    if (!category) throw new Error("Category Not Found");
    await addproduct.save();
    res.status(201).send(addproduct);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

//@desc  Comment on product
//@route  /product/comment/:id
const commentProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  const comment = {
    name: req.user.firstName,
    comment: req.body.comment,
    user: req.user._id,
  };
  try {
    if (!product) throw new Error("Product Not Found");
    product.comment.push(comment);
    const data = await product.save();
    res.send(data);
  } catch (error) {
    res.send(error.toString());
  }
};

//@desc  view  product
//@route  /products/
const viewProduct = async (req, res) => {
  const product = await Product.find();
  try {
    if (!product) throw new Error("Product Not Found");
    res.send(product);
  } catch (error) {
    res.send(error.toString());
  }
};

//@desc  view  product
//@route  /products/
const viewProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  try {
    if (!product) throw new Error("Product Not Found");
    res.send(product);
  } catch (error) {
    res.send(error.toString());
  }
};

//@desc  like on product
//@route  /product/like/:id
const likeProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  const like = {
    name: req.user.firstName,
    comment: req.body.comment,
    user: req.user._id,
  };
  try {
    if (!product) throw new Error("Product Not Found");
    const data = product.likes.findIndex(
      (item) => item.user == req.user._id.toString()
    );
    if (data === -1) product.likes.push(like);
    if (data != -1) product.likes.splice(data, 1);
    await product.save();
    const totallikes = product.likes.length;
    res.send({ totallikes });
  } catch (error) {
    res.send(error.toString());
  }
};

//@desc  Create Product Category
//@route  /product/category/create
const createProductcategory = async (req, res) => {
  const category = new ProductType(req.body);
  try {
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

module.exports = {
  createProduct,
  createProductcategory,
  commentProduct,
  likeProduct,
  viewProduct,
  viewProductById,
};
