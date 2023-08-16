const express = require("express");
const asyncHandler = require("express-async-handler");
const foodController = require("../controllers/food");
const orderController = require("../controllers/order");
const getValidationResult = require("../utils/getValidationResult");
const newFoodValidators = require("../middlewares/validations/foodValidation");

const router = express.Router();

const requireSignIn = require("../middlewares/authMiddleware");

router.use(requireSignIn);

router.get("/", asyncHandler(orderController.getAllOrder));
router.get("/:id", asyncHandler(orderController.getById));
router.post("/", asyncHandler(orderController.makeOrder));

module.exports = router;
