const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const { addUser } = require('../services/user/user-service');
const { authenticate } = require('../utils/auth');
const { validateTaskId } = require('../utils/validation');
const { addTask, getTask, getAllTask, deleteTask, updateTask } = require('../services/tasks/task-service');

// Auth routes
router.post('/auth/task-manager', [
  body('name').notEmpty().withMessage('Username is required.'),
  body('email').notEmpty().withMessage('Password is required.')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const result = await addUser(req);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the user.', details: error.message });
  }
});

// Create a new task
router.post('/task', authenticate, [
  body('taskTitle').notEmpty().withMessage('Task title is required.'),
  body('description').notEmpty().withMessage('Description is required.')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const taskPayload = req.body;
    const savedTask = await addTask(taskPayload);
    res.status(201).json({
      message: 'Task created successfully.',
      data: savedTask
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the task.', details: error.message });
  }
});

// Get all tasks
router.get('/all-task', authenticate, async (req, res) => {
  try {
    const tasks = await getAllTask();
    res.status(200).json({
      message: 'All tasks fetched successfully.',
      data: tasks
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching tasks.', details: error.message });
  }
});

// Get a specific task by ID
router.get('/task/:taskid', authenticate, [
  param('taskid').isString().withMessage('Invalid Task ID format.')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { taskid } = req.params;
    const task = await getTask(taskid);
    res.status(200).json({
      message: 'Task fetched successfully.',
      data: task
    });
  } catch (error) {
    res.status(error.message === 'Task not found.' ? 404 : 500).json({ error: error.message });
  }
});

// Update a specific task by ID
router.patch('/task/:taskid', authenticate, [
  param('taskid').isString().withMessage('Invalid Task ID format.'),
  body('taskTitle').optional().notEmpty().withMessage('Task title cannot be empty.'),
  body('description').optional().notEmpty().withMessage('Description cannot be empty.')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { taskid } = req.params;
    const updates = req.body;
    const updatedTask = await updateTask(taskid, updates);
    res.status(200).json({
      message: 'Task updated successfully.',
      data: updatedTask
    });
  } catch (error) {
    res.status(error.message === 'Task not found.' ? 404 : 500).json({ error: error.message });
  }
});

// Delete a specific task by ID
router.delete('/task/:taskid', authenticate, [
  param('taskid').isString().withMessage('Invalid Task ID format.')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { taskid } = req.params;
    const result = await deleteTask(taskid);
    res.status(200).json({
      message: 'Task deleted successfully.',
      data: result
    });
  } catch (error) {
    res.status(error.message === 'Task not found.' ? 404 : 500).json({ error: error.message });
  }
});

module.exports = router;









// // api.js
// const express = require('express');
// const router = express.Router();
// const  {addUser} = require('../services/user/user-service')
// const {authenticate} = require('../utils/auth'); 
// const {validateTaskId} = require('../utils/validation'); 
// const {addTask, getTask, getAllTask, deleteTask,updateTask} = require('../services/tasks/task-service')



// // Auth routes
// router.post('/auth/task-manager', async (req, res) => {
//     result = await addUser(req, res);
//     res.send(result);
// });

// router.post('/task', authenticate, async (req, res) => {
//   result = await addTask(req, res);
//     res.send(result);
// });

// router.get('/all-task', authenticate, async (req, res) => {
//   result = await getAllTask(req, res);
//     res.send(result);
// });
// router.get('/task/:taskid', authenticate,validateTaskId, async(req, res) => {
//   console.log('dddd get', req.params, req.query)
//   const task = await getTask(req)
//   res.send(task);
// });


// // PATCH: Update a task by task ID (authentication  required)
// router.patch('/task/:taskid?', authenticate, async (req, res) => {
//   const { taskid } = req.params;

  
//   if (!taskid) {
//       return res.status(400).json({ error: 'Task ID is required in the URL.' });
//   }

//   try {
//       const updatedTask = await updateTask(req);
//       if (!updatedTask) {
//           return res.status(404).json({ error: 'Task not found.' });
//       }

//       res.status(200).json({
//           message: 'Task updated successfully.',
//           data: updatedTask
//       });

//   } catch (error) {
//       res.status(500).json({ error: 'An error occurred while updating the task.', details: error.message });
//   }
// });

// router.delete('/task/:taskid', authenticate,validateTaskId, async(req, res) => {
//   const task = await deleteTask(req)
//   res.send(task);
// });

// // router.get('/task', (req, res) => {
// //   return res.status(400).json({ error: 'Task ID is required.' });
// // });

// module.exports = router;