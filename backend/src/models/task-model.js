// userModel.js
const mongoose = require('mongoose');

let nanoid;
(async () => {
  ({ nanoid } = await import('nanoid'));
})();

// Define the user schema
const taskSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => nanoid(10), // Generate a unique ID with 12 characters
    unique: true, // Ensure the ID is unique
  },
  taskTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],  
    default: 'medium'  
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
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

// Create and export the Task model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;