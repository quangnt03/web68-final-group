const mongoose = require("mongoose");
const config = require("./config");

module.exports = async () => {
  try {
    await mongoose.connect(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongodb...");
  } catch (err) {
    console.error(err);
  }
};
