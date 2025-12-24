const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Using environment variable for MongoDB connection string
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zoo-beauty-palace', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;