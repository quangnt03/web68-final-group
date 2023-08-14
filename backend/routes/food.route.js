const express = require("express");
const asyncHandler = require("express-async-handler");
const foodController = require("../controllers/food");
const getValidationResult = require("../utils/getValidationResult");
const newFoodValidators = require("../middlewares/validations/foodValidation");
const requireAdmin = require("../middlewares/adminMiddleware");

const validatorWithOptional = newFoodValidators.map((check) =>
  check.optional()
);

const router = express.Router();

router.get("/", asyncHandler(foodController.getAll));

router.get("/:id", asyncHandler(foodController.getById));

router.post(
  "/",
  requireAdmin,
  newFoodValidators,
  getValidationResult,
  asyncHandler(foodController.createNewFood)
);

router.patch(
  "/:id",
  requireAdmin,
  validatorWithOptional,
  getValidationResult,
  asyncHandler(foodController.editFood)
);

router.delete("/:id", requireAdmin, asyncHandler(foodController.deleteFood));

module.exports = router;
