const mongoose = require('mongoose');

const connectToMongoose = async () => {
    await mongoose.connect("mongodb://localhost:27017/");
    console.log("Connected to MongoDB");
};

module.exports = connectToMongoose;
