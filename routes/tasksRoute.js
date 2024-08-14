const express = require('express');
const router = express.Router();
const {
    getTasksController,
    getTaskController,
    createTaskController,
    updateTaskController,
    deleteTaskController,
    getTasksForProjectController,
    getDependedTasksController,
} = require('../controllers/taskControllers');
const {mountpath} = require("express/lib/application");


router.get('/tasks', getTasksController);
router.post('/tasks', createTaskController);
router.get('/tasksforproject/:projectId', getTasksForProjectController);
router.get('/dependents/:taskId', getDependedTasksController);
router.get('/tasks/:taskId', getTaskController);
router.put('/tasks/:taskId', updateTaskController);
router.delete('/tasks/:taskId', deleteTaskController);

module.exports = router;
