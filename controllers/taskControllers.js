// controllers/taskController.js
const {
    getSingelTaskService,
    getAllTasksService,
    createTaskService,
    updateTaskService,
    deleteTaskService,
} = require('../services/taskService');

const getTasksController = async (req, res) => {
    try {
        const tasks = await getAllTasksService();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getTaskController = async (req, res) => {
    try {
        const {taskId} = req.params;
        const task = await getSingelTaskService(taskId);
        res.json(task);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

const createTaskController = async (req, res) => {
    try {
        const taskData = req.body;
        const newTask = await createTaskService(taskData);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

const updateTaskController = async (req, res) => {
    try {
        const {taskId} = req.params;
        const taskData = req.body;
        const updatedTask = await updateTaskService(taskId, taskData);
        res.json(updatedTask);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

const deleteTaskController = async (req, res) => {
    try {
        const {id} = req.params;
        await deleteTaskService(taskId);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

module.exports = {
    getTasksController,
    getTaskController,
    createTaskController,
    updateTaskController,
    deleteTaskController
};
