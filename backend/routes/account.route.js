const express = require("express");
const asyncHandler = require("express-async-handler");
const UserModel = require("../models/user.model");
const AccountController = require("../controllers/account");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

//Login function
router.post("/login", asyncHandler(AccountController.login));

//Đăng ký tài khoản
router.post("/register", asyncHandler(AccountController.register));
//Đăng xuất
router.post("/logout", (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
