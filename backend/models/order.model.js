const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "UserData",
    },
    food: {
      type: mongoose.Types.ObjectId,
      ref: "Food",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { toJSON: { virtuals: true } },
  { timestamps: true }
);

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
