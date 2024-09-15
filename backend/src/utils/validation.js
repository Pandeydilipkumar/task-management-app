
const validateTaskId = (req, res, next) => {
    const { taskid } = req.params;
  
    if (!taskid) {
      return res.status(400).json({ error: 'Task ID is required.' });
    }
  
    next();  // Proceed to the next middleware/route handler if taskid is present
  };

  module.exports = {
    validateTaskId
  };