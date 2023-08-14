const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const config = require("../config");

const UnauthorizedException = require("../exception/UnauthorizedException");

const saltRounds = 10;

module.exports = {
  //Login function
  async login(req, res) {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({
        success: false,
        error: "Missing login info",
      });
    }
    try {
      const user = await UserModel.findOne({
        username: req.body.username,
      });
      if (!user) {
        throw new UnauthorizedException("User not found");
      }
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException("Wrong password");
      }
      const token = jwt.sign({ userId: user._id }, config.JWTSecret);

      return res.status(200).json({
        success: true,
        token: token,
      });
    } catch (err) {
      res.json({ success: false, ...err });
    }
  },

  //Đăng ký tài khoản
  async register(req, res) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      const user = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        role: "user",
      });

      await user.save();

      return res.status(400).json({ success: true });
    } catch (err) {
      if (err.code === 11000) {
        if (err.keyPattern.username) {
          return res
            .status(400)
            .json({ success: false, error: "Duplicate username" });
        } else if (err.keyPattern.email) {
          return res
            .status(400)
            .json({ success: false, error: "Duplicate email" });
        }
      } else {
        return res
          .status(500)
          .json({ success: false, error: "An error occurred" });
      }
    }
  },
};
