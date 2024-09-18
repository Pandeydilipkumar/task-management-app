const Task = require('../../models/task-model');
const { ValidationError } = require('express-validator');

// Create a new task
const addTask = async (taskPayload) => {
  try {
    // Validate input
    if (!taskPayload.taskTitle || !taskPayload.description) {
      throw new ValidationError('Task title and description are required.');
    }

    const newTask = new Task(taskPayload);
    const savedTask = await newTask.save();
    console.log('asss',savedTask,taskPayload)

    return savedTask;
  } catch (error) {
    console.log("error",error)
    throw new Error(`Error saving task: ${error.message}`);
  }
};

// Get a specific task by ID
const getTask = async (taskid) => {
  try {
    if (!taskid) {
      throw new ValidationError('Task ID is required.');
    }

    const task = await Task.findOne({"id": taskid});
    if (!task) {
      throw new Error('Task not found.');
    }
    return task;
  } catch (error) {
    throw new Error(`Error fetching task: ${error.message}`);
  }
};

// Get all tasks
const getAllTask = async () => {
  try {
    const tasks = await Task.find();
    return tasks;
  } catch (error) {
    throw new Error(`Error fetching tasks: ${error.message}`);
  }
};

// Update a specific task by ID
const updateTask = async (taskid, updates) => {
  try {
    if (!taskid) {
      throw new ValidationError('Task ID is required.');
    }

    const updatedTask = await Task.findOneAndUpdate(
      {"id": taskid},
      updates,
      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      throw new Error('Task not found.');
    }
    return updatedTask;
  } catch (error) {
    throw new Error(`Error updating task: ${error.message}`);
  }
};

// Delete a specific task by ID
const deleteTask = async (taskid) => {
  try {
    if (!taskid) {
      throw new ValidationError('Task ID is required.');
    }

    await Task.deleteOne({ id: taskid });
    const result = await getAllTask()
    // if (result.deletedCount === 0) {
    //   throw new Error('Task not found.');
    // }
    return result;
  } catch (error) {
    throw new Error(`Error deleting task: ${error.message}`);
  }
};

module.exports = {
  addTask,
  getTask,
  getAllTask,
  deleteTask,
  updateTask
};









