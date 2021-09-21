const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const db = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Mongo DB connected');
  } catch (err) {
    console.error(err.message);
    // Exit perocess with failure
    process.exit(1);
  }
};

module.exports = connectDB;
