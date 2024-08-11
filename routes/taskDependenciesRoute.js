const express = require('express');
const {
    addTaskDependencyController,
    deleteTaskDependencyController,
    getTaskDependenciesController,
} = require('../controllers/taskDependencyController');

const router = express.Router();

// Route to add a single task dependency
router.post('/taskdependency', addTaskDependencyController);

// Route to delete a specific task dependency
router.delete('/taskdependency/:taskId/:dependsOnTaskId', deleteTaskDependencyController);

// Route to get all dependencies for a specific task
router.get('/taskdependency/:taskId', getTaskDependenciesController);

module.exports = router;
