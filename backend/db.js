const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://user:abc@cluster0.5lroxkm.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri);
let orderCollection, inventoryCollection, userCollection;
async function connectToDb() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas!");

    const db = client.db("PizzaStore");
    userCollection = db.collection("userdata");
    allUsers = await userCollection.find({}).toArray();

  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

async function getAllUsers() {
  return allUsers;
}

module.exports = {
  connectToDb, getAllUsers
};


