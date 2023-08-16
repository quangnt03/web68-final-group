const mongoose = require("mongoose");
const UserModel = require("./user.model");
const FoodModel = require("./food.model");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: UserModel,
    },
    food: {
      type: mongoose.Types.ObjectId,
      ref: FoodModel,
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
  {
    toJSON: { virtuals: true },
    methods: {
      addQuantity(quantity) {
        this.quantity = this.quantity + quantity;
      },
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("Order", orderSchema, "orders");

module.exports = orderModel;
