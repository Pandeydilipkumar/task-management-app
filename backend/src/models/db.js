
const mongoose = require('mongoose');

// MongoDB connection string
const uri = 'mongodb://localhost:27017/task-management';

// Connect to MongoDB using Mongoose
const connectDB = async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Connection error:', error);
    process.exit(1); // Exit the process with failure
  }
};

// Export the connection function
module.exports = connectDB;