const mongoose = require("mongoose");
const foodTypesConstants = require("../constants/foodTypes");

const foodSchema = mongoose.Schema(
  {
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

const Food = mongoose.model("Food", foodSchema, "foods");
module.exports = Food;
