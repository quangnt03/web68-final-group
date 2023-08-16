const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model'); 
require('dotenv').config();
const secretKey = process.env.JWT_SECRET;

const findUserByToken = async (req, res, next) => {
  try {
    const { password } = req.body;

    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    const decodedToken = jwt.verify(token, secretKey);
    const _id = decodedToken.userId;

    const user = await UserModel.findById(_id);
    console.log('người dùng là', user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

      req.user = user; 
      req.password = password
      next(); 
    
  } catch (error) {
    console.error('Error checking password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = findUserByToken
