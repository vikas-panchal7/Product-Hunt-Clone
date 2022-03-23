const express = require("express");
const router = express.Router();
const { signUp, Login, Logout } = require("../controllers/usercontroller");

//for signup
router.post("/users/signUp", signUp);

//for login
router.post("/users/login", Login);

//for logout
router.post("/users/logout", Logout);

module.exports = router;
