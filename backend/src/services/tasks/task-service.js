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
    return savedTask;
  } catch (error) {
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

    const result = await Task.deleteOne({ id: taskid });
    if (result.deletedCount === 0) {
      throw new Error('Task not found.');
    }
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









// const Task = require('../../models/task-model');
// const addTask = async (req, res) => {
//   try {
//     const { taskTitle, description, dueDate, priority, status } = req.body
//     const taskPayload = {
//       taskTitle,
//       description,
//       dueDate,
//       priority,
//       status,
//     };
//     const newTask = new Task(taskPayload);
//     const savedTask = await newTask.save();
//     const response = { "message": "task created", "data": savedTask }
//     return response

//   } catch (error) {
//     console.error('Error saving task:', error);
//   }
// };

// const getTask = async (req, res) => {
//   try {
//     const { taskid } = req.params;

//     const taskPayload = { "id": taskid }
//     const task = await Task.findOne(taskPayload);
//     const response = { "message": " one task fetched", "data": task }
//     return response
//   } catch (error) {
//     console.log("eee", error)
//     console.error('Error fetching task:', error);
//   }
// };


// const getAllTask = async (req, res) => {
//   try {
//     const taskPayload = {}
//     const task = await Task.find(taskPayload);
//     const response = { "message": "all task fetched", "data": task }
//     return response
//   } catch (error) {
//     console.log("eee all error", error)
//     console.error('Error fetching task:', error);
//   }
// };





// const updateTask = async (req, res) => {
//   console.log("Request received for task update:", req.params, req.body);


//   const { taskid } = req.params;

//   if (!taskid) {
//     return res.status(400).json({ error: 'Task ID is required.' });
//   }

//   const updates = req.body;

//   try {
//     const result = await Task.findOneAndUpdate(
//       { id: taskid },
//       updates,
//       { new: true, runValidators: true }
//     );

//     if (!result) {
//       return res.status(404).json({ error: 'Task not found.' });
//     }


//     return res.status(200).json({
//       message: 'Task updated successfully.',
//       data: result
//     });

//   } catch (error) {
//     console.error('Error updating task:', error);
//     return res.status(500).json({ error: 'An error occurred while updating the task.' });
//   }
// };



// const deleteTask = async (req, res) => {
//   try {
//     const { taskid } = req.params;
//     const result = await Task.deleteOne({ id: taskid });
//     const response = { "message": "task deleted", "data": result }
//   } catch (error) {
//     console.error('Error deleting task:', error);
//   }
// }

// module.exports = {
//   addTask,
//   getTask,
//   getAllTask,
//   deleteTask,
//   updateTask
// };