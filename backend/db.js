const mongoose = require("mongoose");
const config = require("./config");

module.exports = async () => {
  try {
    await mongoose.connect("mongodb+srv://pizza:pizza@cluster0.5lroxkm.mongodb.net/PizzaStore", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongodb...");
  } catch (err) {
    console.error(err);
  }
};
