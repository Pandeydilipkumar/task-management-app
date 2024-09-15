// userModel.js
const mongoose = require('mongoose');

let nanoid;
(async () => {
  ({ nanoid } = await import('nanoid'));
})();

// Define the user schema
const userSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => nanoid(10), // Generate a unique ID with 12 characters
    unique: true, // Ensure the ID is unique
  },
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  phone:{
      type: Number,
      required: true
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;