const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
  },
  { toJSON: { virtuals: true } },
  { timestamps: true }
);

const UserModel = mongoose.model("UserData", User, "userdata");

module.exports = UserModel;
