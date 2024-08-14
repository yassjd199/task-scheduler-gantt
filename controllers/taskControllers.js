// controllers/taskController.js
const {
    getSingelTaskService,
    getAllTasksService,
    createTaskService,
    updateTaskService,
    deleteTaskService,
    getTasksForProjectService,
    getDependedTasksService,
} = require('../services/taskService');

const {getSingleProjectService} = require("../services/projectService");
const updateTaskDates = require('../services/scheduleService');

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
const getTasksForProjectController = async (req, res) => {
    const {projectId} = req.params; // Retrieve projectId from request parameters

    try {
        const project = await getSingleProjectService(projectId);
        const projectStartTime = project.startDate;
        //console.debug(projectStartTime);

        await updateTaskDates(projectId, projectStartTime);

        // Fetch the tasks for the project
        const tasks = await getTasksForProjectService(projectId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({message: error.message});
        console.error(error.message);
    }
};


const getDependedTasksController = async (req, res) => {
    try {
        const {taskId} = req.params;

        if (!taskId) {
            return res.status(400).json({error: 'Task ID is required'});
        }

        // Fetch the dependent tasks
        const dependencies = await getDependedTasksService(taskId);

        res.status(200).json(dependencies);
    } catch (error) {
        console.error('Error fetching depended tasks:', error);
        res.status(500).json({error: 'An error occurred while fetching depended tasks'});
    }
}

module.exports = {
    getTasksController,
    getTaskController,
    createTaskController,
    updateTaskController,
    deleteTaskController,
    getTasksForProjectController,
    getDependedTasksController,
};
