const mongoose = require("mongoose");

const connectToMongoose = async () => {
  await mongoose.connect("mongodb://localhost:27017/inotebook");
  console.log("Connected to MongoDB");
};

module.exports = connectToMongoose;
