const express = require("express");
const asyncHandler = require("express-async-handler");
const foodController = require("../controllers/food");
const getValidationResult = require("../utils/getValidationResult");
const newFoodValidators = require("../middlewares/validations/foodValidation");

const validatorWithOptional = newFoodValidators.map((check) =>
  check.optional()
);

const router = express.Router();

router.get("/", asyncHandler(foodController.getAll));

router.get("/:id", asyncHandler(foodController.getById));

router.post(
  "/",
  newFoodValidators,
  getValidationResult,
  asyncHandler(foodController.createNewFood)
);

router.patch(
  "/:id",
  validatorWithOptional,
  getValidationResult,
  asyncHandler(foodController.editFood)
);

router.delete("/:id", asyncHandler(foodController.deleteFood));

module.exports = router;
