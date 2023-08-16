const ResourceNotFoundException = require("../exception/ResourceNotFoundException");
const ServerException = require("../exception/ServerException");
const Order = require("../models/order.model");
const Food = require("../models/food.model");
const { SERVER_DEFAULT_ERROR } = require("../constants/exception");

module.exports = {
  async getAllOrders() {
    const order = await Order.find({}).populate("food");
    return populated;
  },
  async findOrderByUser(userId) {
    const order = await Order.find({ user: userId }).populate("food");
    return order || null;
  },

  async findOrderById(orderId) {
    const order = await Order.findById(orderId).populate("food");
    return order;
  },

  async findOrderByUserAndFood(userId, foodId) {
    const order = await Order.find({ user: userId, food: foodId }).populate(
      "food"
    );
    if (!order) {
      throw new ResourceNotFoundException();
    }
    return order;
  },

  async createOrder(userId, orderId, quantity) {
    try {
      const order = await Order.create({
        user: userId,
        food: orderId,
        quantity,
      });
      return order;
    } catch (error) {
      throw new ServerException(SERVER_DEFAULT_ERROR);
    }
  },
};
