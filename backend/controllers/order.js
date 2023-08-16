const { isValidObjectId, Types } = require("mongoose");
const InvalidArgumentException = require("../exception/InvalidArgumentException");
const ResourceNotFoundException = require("../exception/ResourceNotFoundException");
const UnauthorizedException = require("../exception/UnauthorizedException");
const FoodService = require("../services/food");
const OrderService = require("../services/order");

module.exports = {
  async makeOrder(req, res) {
    if (!req.body.food || !isValidObjectId(req.body.food)) {
      throw new InvalidArgumentException("Invalid order");
    }

    const foodId = new Types.ObjectId(req.body.food);
    const userId = new Types.ObjectId(req.user.userId);

    const qty = req.body.quantity ? Number(req.body.quantity) : 1;

    if (isNaN(qty) || qty < 0) {
      throw new InvalidArgumentException("Invalid order quantity");
    }

    const food = await FoodService.getById(foodId);
    if (!food) {
      throw new ResourceNotFoundException("Unavailable food");
    }

    const newOrder = await OrderService.createOrder(userId, foodId, qty);
    return res.status(200).json({ success: true, order: newOrder });
  },
  async getAllOrder(req, res) {
    let orders;
    if (req.user.role === "admin") {
      orders = await OrderService.getAllOrders();
    } else {
      orders = await OrderService.findOrderByUser(req.user.userId);
    }

    return res.status(200).json({ success: true, orders });
  },
  async getById(req, res) {
    if (!req.params.id || !isValidObjectId(req.params.id)) {
      throw new InvalidArgumentException("Invalid order");
    }

    const order = await OrderService.findOrderById(req.params.id);
    if (!order) {
      throw new ResourceNotFoundException();
    }
    const orderObj = order.toObject();
    const userId = new Types.ObjectId(req.user.userId);

    if (req.user.role == "admin" || userId.equals(orderObj.user)) {
      const targetOrders = await OrderService.findOrderByUser(req.user.userId);
      return res.status(200).json({ success: true, order: targetOrders });
    } else {
      throw new UnauthorizedException(
        "You had no permission to access the resource"
      );
    }
  },
};
