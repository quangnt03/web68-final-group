const express = require("express");
const asyncHandler = require("express-async-handler");
const UserModel = require("../models/user.model");
const AccountController = require("../controllers/account");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const findUserByToken = require('../middlewares/findUserByToken')

const router = express.Router();

//Login function
router.post("/login", asyncHandler(AccountController.login));

//Đăng ký tài khoản
router.post("/register", asyncHandler(AccountController.register));
//Đăng xuất
router.post("/logout", (req, res) => {
  res.sendStatus(200);
});

router.get("/info", findUserByToken, asyncHandler(AccountController.getUserInfo))

router.post('/check-password', findUserByToken, asyncHandler(AccountController.checkPassword))

router.put("/update-user", asyncHandler(AccountController.updateUserInfo))

router.put('/change-password', asyncHandler(AccountController.changePassword))

module.exports = router;
