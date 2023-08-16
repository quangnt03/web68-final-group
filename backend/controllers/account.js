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
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        config.JWTSecret,
        {
          expiresIn: "24h",
        }
      );

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

      res.json({ status: 'ok' })
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

  //Hiển thị thông tin tài khoản tại trang admin
  async getUserInfo(req,res) {
    try {
      const user = req.user
      res.send({ username: user.username, email: user.email, role: user.role });
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).send({ error: 'Server error' });
    }
  },

  async checkPassword(req, res) {
    try {
      const user = req.user;
      const password = req.password
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (isPasswordCorrect) {
        res.status(200).json(
          {
            message: 'Password is correct',
            user: user
          });
      } else {
        res.status(401).json({ message: 'Incorrect password' });
      }
    } catch (error) {
      console.error('Error checking password:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  //Update thông tin người dùng
  async updateUserInfo(req, res) {
    try {
      const { user, updatedData } = req.body;
      const updatedFields = {
        username: updatedData.username,
        email: updatedData.email
      }
      const updatedUser = await UserModel.findByIdAndUpdate(user._id, updatedFields, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User data updated successfully', updatedUser });
    } catch (err) {
      if (err.code === 11000) {
        if (err.keyPattern.username) {
          res.status(500).json({ status: 'error', error: 'Duplicate username' });;
        } else if (err.keyPattern.email) {
          res.status(500).json({ status: 'error', error: 'Duplicate email' });
        }
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  },

  //Đổi password
  async changePassword(req, res) {
    try {
      const { user, password } = req.body;
      const hashedNewPassword = await bcrypt.hash(password, saltRounds)
      const updatedPassword = await UserModel.findByIdAndUpdate(user._id, { password: hashedNewPassword }, { new: true });
  
      if (!updatedPassword) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User data updated successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};
