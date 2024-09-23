const mongoose = require("mongoose");
require("dotenv").config();
const {mongoUri} = require("../endpoint")
const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
module.exports = connectToDatabase;
