const User = require("../models/users");

// @desc    Register a new user
// @route   /users/signUp
const signUp = async (req, res) => {
  const adduser = new User(req.body);
  try {
    await adduser.save();
    res.status(201).send(adduser);
  } catch (error) {
    if (error && error?.code) {
      return res.status(409).send({ error: "Email is Already Exist" });
    }
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
    res.status(400).send(e.toString());
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
    res.status(400).send(e.toString());
  }
};
module.exports = { signUp, Login, Logout };
