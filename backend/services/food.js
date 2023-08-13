const Food = require("../models/Food");
const UnprocessableEntityException = require("../exception/UnprocessableEntityException");
const ResourceNotFoundException = require("../exception/ResourceNotFoundException");
const errorMsg = require("../constants/exception");

module.exports = {
  async getAll() {
    const allFood = await Food.find({});
    return allFood;
  },
  async getById(id) {
    const selectedFood = await Food.find({ _id: id });
    return selectedFood;
  },
  async findByName(name) {
    const selectedFood = await Food.find({
      title: { $regex: ".*" + name + ".*", $options: "si" },
    });
    return selectedFood;
  },

  async createNewFood(body) {
    const newFood = new Food(body);
    try {
      await newFood.save();
      return newFood;
    } catch (_) {
      throw new UnprocessableEntityException(errorMsg.SERVER_DEFAULT_ERROR);
    }
  },

  async updateOne(id, body) {
    try {
      const updatedDoc = await Food.findByIdAndUpdate(id, body, { new: true });
      return updatedDoc;
    } catch (_) {
      throw new ResourceNotFoundException(errorMsg.NOT_FOUND);
    }
  },
  async deleteOne(id) {
    try {
      const deletedDoc = await Food.findByIdAndDelete(id);
      return deletedDoc;
    } catch (_) {
      throw new ResourceNotFoundException(errorMsg.NOT_FOUND);
    }
  },
};
