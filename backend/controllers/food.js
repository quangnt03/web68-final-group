const FoodService = require("../services/food");
const ServerException = require("../exception/ServerException");
const InvalidArgumentException = require("../exception/InvalidArgumentException");
const ResourceNotFoundException = require("../exception/ResourceNotFoundException");
const errorMsg = require("../constants/exception");

module.exports = {
  async getAll(req, res) {
    try {
      let food;
      if (req.query.q) {
        food = await FoodService.findByName(req.query.q);
      } else {
        food = await FoodService.getAll();
      }
      return res.json({ data: food });
    } catch (err) {
      throw new ServerException(errorMsg.SERVER_DEFAULT_ERROR);
    }
  },

  async getById(req, res) {
    if (!req.params.id) {
      throw new InvalidArgumentException(errorMsg.INVALID_ARGUMENT);
    }
    try {
      const food = await FoodService.getById(req.params.id);
      if (!food || !food.length) {
        throw new ResourceNotFoundException(errorMsg.NOT_FOUND);
      }
      return res.json({ data: food });
    } catch (err) {
      throw new ServerException(errorMsg.SERVER_DEFAULT_ERROR);
    }
  },

  async createNewFood(req, res) {
    try {
      const newFood = await FoodService.createNewFood(req.body);
      return res.status(201).json({ data: newFood });
    } catch (err) {
      throw new ServerException(errorMsg.SERVER_DEFAULT_ERROR);
    }
  },

  async editFood(req, res) {
    if (!req.params.id) {
      throw new InvalidArgumentException(errorMsg.INVALID_ARGUMENT);
    }
    const food = await FoodService.getById(req.params.id);

    if (!food) {
      throw new ResourceNotFoundException(errorMsg.NOT_FOUND);
    }

    const newFood = await FoodService.updateOne(req.params.id, req.body);

    return res.status(201).json({ data: newFood });
  },
  async deleteFood(req, res) {
    if (!req.params.id) {
      throw new InvalidArgumentException(errorMsg.INVALID_ARGUMENT);
    }
    const food = await FoodService.getById(req.params.id);

    if (!food) {
      throw new ResourceNotFoundException(errorMsg.NOT_FOUND);
    }

    const deletedFood = await FoodService.deleteOne(req.params.id);

    return res.status(201).json({ data: deletedFood });
  },
};
