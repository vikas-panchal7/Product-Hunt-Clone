const User = require("../models/users");

// @desc    Register a new user
// @route   /users/signUp
const signUp = async (req, res) => {
  const adduser = new User(req.body);
  try {
    const product = await User.find({ email: req.body.email });
    if (!product) throw new Error("Email is Already Exist");
    await adduser.save();
    res.status(201).send(adduser);
  } catch (e) {
    res.status(500).send({ error: "Please Provide  All Information" });
  }
};

// @desc   for Login user
// @route   /users/login
const Login = async (req, res) => {
  try {
    const user = await User.findByCredentails(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthtoken();

    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).send({ error: e.toString() });
  }
};

// @desc    Logout users
// @route   /users/logout
const Logout = async (req, res) => {
  try {
    const user = await User.findByCredentails(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthtoken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send({ error: e.toString() });
  }
};

const Profile = async (req, res) => {
  try {
    console.log("SS", req.body);
    const filter = { _id: req.user._id };
    const img = req.file?.path;
    let update = {};
    if (img) {
      update = {
        ...req.body,
        avtar: img,
      };
    } else {
      update = { ...req.body };
    }

    const user = await User.findByIdAndUpdate(filter, update, { new: true });
    console.log(user);
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send({ error: e.toString() });
  }
};

const userInfos = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send({ error: e.toString() });
  }
};
module.exports = { signUp, Login, Logout, Profile, userInfos };
