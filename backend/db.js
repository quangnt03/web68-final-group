const { MongoClient } = require("mongodb");
const mongoose = require('mongoose')
const UserModel = require('./models/user.model')
const FoodModel = require('./models/food.model')

let userCollection, foodCollection, allUsers, allFoods;

  // async function connectToDb() {
  //   try {
  //     console.log("ConnectToDb run");
  
  //     // Use the models to query data
  //     // allUsers = await UserModel.find({}).exec();
  //     // console.log(allUsers)
  //   } catch (err) {
  //     console.error('Error connecting to MongoDB:', err);
  //   }
  // }


async function getAllUsers() {
  // const allUsers = await User.find({}).exec();
  allUsers = await UserModel.find({}).exec();
  return allUsers;
}

async function getAllFoods() {
  console.log('abc')
  allFoods = await FoodModel.find({}).exec();
  return allFoods;
}

module.exports = {
  getAllUsers, getAllFoods, allUsers, allFoods
};


