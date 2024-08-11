const express = require('express');
const router = express.Router();
const {
    getTasksController,
    getTaskController,
    createTaskController,
    updateTaskController,
    deleteTaskController
} = require('../controllers/taskControllers');
const {mountpath} = require("express/lib/application");


router.get('/tasks', getTasksController).post('/tasks', createTaskController);
router.get('/tasks/:taskId', getTaskController);
router.put('/tasks/:taskId', updateTaskController);
router.delete('/tasks/:taskId', deleteTaskController);

module.exports = router;
