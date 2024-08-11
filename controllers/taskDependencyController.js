const {
    addTaskDependencyService,
    deleteTaskDependencyService,
    getTaskDependenciesService,
} = require('../services/taskDependencyService');

// Controller to add a task dependency
const addTaskDependencyController = async (req, res) => {
    try {
        const {taskId, dependsOnTaskId} = req.body;
        const dependency = await addTaskDependencyService(taskId, dependsOnTaskId);
        res.status(201).json(dependency);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Controller to delete a task dependency
const deleteTaskDependencyController = async (req, res) => {
    try {
        const {taskId, dependsOnTaskId} = req.params;
        await deleteTaskDependencyService(taskId, dependsOnTaskId);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

// Controller to get all dependencies for a specific task
const getTaskDependenciesController = async (req, res) => {
    try {
        const {taskId} = req.params;
        const dependencies = await getTaskDependenciesService(taskId);
        if (dependencies.length > 0) {
            res.status(200).json(dependencies);
        } else {
            res.status(404).json({message: 'No dependencies found for this task'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    addTaskDependencyController,
    deleteTaskDependencyController,
    getTaskDependenciesController,
};
