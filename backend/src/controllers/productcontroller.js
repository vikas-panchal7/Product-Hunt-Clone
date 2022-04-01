const Product = require("../models/product");

// @desc     Create a new product
// @route   /product/create
const createProduct = async (req, res) => {
  console.log("ss", req.files.img1[0].path);
  console.log(req.body);
  const addproduct = new Product({
    ...req.body,
    img: req.files.img[0].path,
    img1: req.files.img1[0].path,
    owner: req.user._id,
  });
  try {
    await addproduct.save();
    res.status(201).send(addproduct);
  } catch (e) {
    res.status(500).send({ error: e.toString() });
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
  } catch (e) {
    res.send({ error: e.toString() });
  }
};

//@desc  view  product
//@route  /products/
const viewProduct = async (req, res) => {
  const product = await Product.find();
  try {
    if (!product) throw new Error("Product Not Found");
    res.send(product);
  } catch (e) {
    res.send({ error: e.toString() });
  }
};

//@desc  view  product
//@route  /products/
const viewProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  try {
    if (!product) throw new Error("Product Not Found");
    res.send(product);
  } catch (e) {
    res.send({ error: e.toString() });
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
  } catch (e) {
    res.send({ error: e.toString() });
  }
};

module.exports = {
  createProduct,
  commentProduct,
  likeProduct,
  viewProduct,
  viewProductById,
};
