const { default: mongoose } = require("mongoose");
const Product = require("../models/product");
const validator = require("validator");

// @desc     Create a new product
// @route   /product/create
const createProduct = async (req, res) => {
  try {
    if (!validator.isURL(req.body.videourl)) {
      throw new Error("Please Provide Valid URL");
    }

    const images = req.files?.img;
    const images2 = req.files?.img1;
    const files = Object.keys(req.files).length;
    if (files <= 1) {
      throw new Error("Please Provide Image");
    }
    const addproduct = new Product({
      ...req.body,
      img: req.files?.img[0].path,
      img1: req.files?.img1[0].path,
      owner: req.user._id,
    });
    await addproduct.save();
    res.status(201).send(addproduct);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

//@desc  Comment on product
//@route  /product/comment/:id

const commentProduct = async (req, res) => {
  const comment = {
    name: req.user.firstName,
    comment: req.body.comment,
    user: req.user._id,
  };
  try {
    const product = await Product.findById(req.params.id);

    if (!product) throw new Error("Product Not Found");
    if (req.body.commentid) {
      const data = product.comment.findIndex(
        (x) => x.id === req.body.commentid
      );
      await product.comment[data].reply.push(comment);
    } else {
      product.comment.push(comment);
    }
    const data1 = await product.save();
    res.send(data1);
  } catch (e) {
    res.send({ error: e.toString() });
  }
};

//@desc  view  upcomings products
//@route  /products/upcomings
const viewUpcomingProduct = async (req, res) => {
  try {
    const product = await Product.find({ type: "Upcoming" })
      .limit(parseInt(req.query.limit))
      .skip(parseInt(req.query.skip))
      .sort({ _id: parseInt(req.query.sort) });
    // if (!product) throw new Error("Product Not Found");
    res.send(product);
  } catch (e) {
    res.send({ error: e.toString() });
  }
};

//@desc  view  product
//@route  /products/
const viewProduct = async (req, res) => {
  try {
    const count = await Product.find().count();
    const product = await Product.find()
      .limit(parseInt(req.query.limit))
      .skip(parseInt(req.query.skip))
      .sort({ _id: parseInt(req.query.sort) });
    // if (!product) throw new Error("Product Not Found");
    res.send({ product, count });
  } catch (e) {
    res.send({ error: e.toString() });
  }
};

//@desc  view  product details
//@route /products/details/:id
const viewProductById = async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate({
      path: "comment",
      populate: [
        {
          path: "user",
        },
        {
          path: "reply",
          populate: {
            path: "user",
          },
        },
      ],
    })
    .then((result) => {
      result.comment.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
      return result;
    });

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
  const like = {
    name: req.user.firstName,
    comment: req.body.comment,
    user: req.user._id,
  };
  try {
    const product = await Product.findById(req.params.id);
    if (!product) throw new Error("Product Not Found");
    const data = product.likes.findIndex(
      (item) => item.user == req.user._id.toString()
    );
    if (data === -1) product.likes.push(like);
    if (data != -1) product.likes.splice(data, 1);
    await product.save();
    const totallikes = product.likes.length;
    res.send({ product });
  } catch (e) {
    res.send({ error: e.toString() });
  }
};

//@desc  like on product
//@route  /product/like/:id
const getlikeProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) throw new Error("Product Not Found");
    const totallikes = product.likes.length;
    res.send({ totallikes });
  } catch (e) {
    res.send({ error: e.toString() });
  }
};

//@desc  get my product
//@route  /products/myproducts
const getmyProducts = async (req, res) => {
  try {
    const count = await Product.find({ owner: req.user._id }).count();
    const product = await Product.find({ owner: req.user._id })
      .limit(parseInt(req.query.limit))
      .skip(parseInt(req.query.skip))
      .sort({ _id: parseInt(req.query.sort) });
    if (product.length === 0) throw new Error("No Product Found");
    res.send({ product, count });
  } catch (e) {
    res.send({ error: e.message });
  }
};

// @desc     update a new product
// @route   /products/update/:id
const updateProduct = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.files);
    if (!validator.isURL(req.body.videourl)) {
      throw new Error("Please Provide Valid URL");
    }
    const filter = { _id: req.params.id };
    let updateproduct = { ...req.body };
    const images = req.files?.img;
    const images2 = req.files?.img1;
    if (images) {
      updateproduct = {
        ...req.body,
        img: req.files?.img[0]?.path,
      };
    }
    if (images2) {
      updateproduct = {
        ...req.body,
        img1: req.files?.img1[0]?.path,
      };
    }
    if (images && images2) {
      updateproduct = {
        ...req.body,
        img: req.files?.img[0]?.path,
        img1: req.files?.img1[0]?.path,
      };
    }
    const product = await Product.findByIdAndUpdate(filter, updateproduct, {
      new: true,
    });

    res.status(201).send(product);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: e.message });
  }
};

// @desc     update a new product
// @route   /product/delete/:id
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  try {
    if (product) {
      await product.remove();
      res.status(200).send();
    } else {
      throw new Error("Product not found");
    }
  } catch (e) {
    console.error(e);
    res.send({ error: e.message });
  }
};

module.exports = {
  createProduct,
  commentProduct,
  likeProduct,
  viewProduct,
  viewProductById,
  getlikeProduct,
  viewUpcomingProduct,
  getmyProducts,
  updateProduct,
  deleteProduct,
};
