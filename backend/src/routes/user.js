const express = require("express");
const User = require("../models/users");
const router = express.Router();

//for signup
router.post("/users/signUp", async (req, res) => {
  const adduser = new User(req.body);
  try {
    await adduser.save();
    res.status(201).send(adduser);
  } catch (error) {
    if (error && error?.code) {
      return res.status(409).send({ error: "Email is Already Exist" });
    }
    res.status(500).send(error.toString());
  }
});

//for login
router.post("/users/login", async (req, res) => {
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
});

//for logout from bike app
router.post("/users/logout", async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
