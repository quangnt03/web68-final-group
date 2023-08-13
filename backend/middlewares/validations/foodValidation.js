const { body } = require("express-validator");
const foodTypes = require("../../constants/foodTypes");
const messages = require("../../constants/validationMsg");

module.exports = [
  body("title").notEmpty().withMessage(messages.REQUIRED),
  body("image").notEmpty().withMessage(messages.REQUIRED),
  body("price")
    .isFloat({ min: 0 })
    .withMessage(messages.INVALID)
    .notEmpty()
    .withMessage(messages.REQUIRED),
  body("content")
    .notEmpty()
    .withMessage(messages.REQUIRED)
    .isLength({ max: 200 })
    .withMessage(messages.INVALID),

  body("isPopular")
    .notEmpty()
    .withMessage(messages.REQUIRED)
    .isBoolean()
    .withMessage(messages.INVALID),

  body("type")
    .notEmpty()
    .withMessage(messages.REQUIRED)
    .isIn(foodTypes)
    .withMessage(messages.INVALID),
];
