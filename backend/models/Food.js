const mongoose = require("mongoose");
const foodTypesConstants = require("../constants/foodTypes");

const foodSchema = mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      default: new mongoose.Types.ObjectId(),
    },
    title: String,
    image: String,
    price: Number,
    content: String,
    price: Number,
    isPopular: Boolean,
    type: {
      type: String,
      enum: foodTypesConstants,
    },
  },
  { toJSON: { virtuals: true } },
  { timestamps: true }
);

module.exports = mongoose.model("Food", foodSchema, "foods");
